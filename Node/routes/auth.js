const express = require("express");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const authRouter = express.Router(); 
const uploadsPath = path.join(__dirname, '..', 'uploads');

const app = express(); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const auth = require("../middleware/auth");
const client = require('../databasepg'); 

app.use(express.json());

app.use(authRouter);

authRouter.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, address, DOB, phone, profileImage, type } = req.body;

        const existingUserQuery = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUserQuery.rows.length > 0) {
            return res.status(400).json({ msg: "User with same email already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        const newUserQuery = `
            INSERT INTO users (name, email, password, address, DOB, phone, profileImage, type) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING id, name, email, address, DOB, phone, profileImage, type
        `;
        const user = await client.query(newUserQuery, [name, email, hashedPassword, address, DOB, phone, profileImage, type]);

        res.status(200).json(user.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userQuery = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userQuery.rows[0];

        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }

        const token = jwt.sign({ id: user.id }, "passwordKey");

        res.json({ token, user });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


authRouter.post('/isTokenValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.json(false);
        }

        const verified = jwt.verify(token, "passwordKey");
        if (!verified) {
            return res.json(false);
        }

        const userQuery = await client.query('SELECT * FROM users WHERE id = $1', [verified.id]);
        if (userQuery.rows.length === 0) {
            return res.json(false);
        }

        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


authRouter.get('/', auth, async (req, res) => {
    try {
        const userQuery = await client.query(
            'SELECT id, name, email, address, DOB, phone, profileImage, type FROM users WHERE id = $1', 
            [req.user]
        );
        const user = userQuery.rows[0];

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.profileImage) {
            user.profileImage = `${user.profileImage}`;
        }

        res.json({ ...user, token: req.token });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) 
    }
});
  
const upload = multer({ storage: storage });
  
authRouter.put('/api/update', auth, upload.single('profileImage'), async (req, res) => {
    try {
        const { name, email, address, DOB, phone, password, type } = req.body;

        const currentUserQuery = await client.query('SELECT * FROM users WHERE id = $1', [req.user]);
        const currentUser = currentUserQuery.rows[0];

        const updates = [];
        const values = [];
        let index = 1;

        if (name) {
            updates.push(`name = $${index++}`);
            values.push(name);
        }

        if (email) {
            updates.push(`email = $${index++}`);
            values.push(email);
        }

        if (address) {
            updates.push(`address = $${index++}`);
            values.push(address);
        }

        if (DOB) {
            updates.push(`DOB = $${index++}`);
            values.push(new Date(DOB));
        }

        if (phone) {
            updates.push(`phone = $${index++}`);
            values.push(phone);
        }

        let oldImagePath;
        if (req.file) {
            oldImagePath = currentUser.profileimage;
            const profileImagePath = `/uploads/${req.file.filename}`;
            updates.push(`profileImage = $${index++}`);
            values.push(profileImagePath);
        }

        if (password) {
            const hashedPassword = await bcryptjs.hash(password, 8);
            updates.push(`password = $${index++}`);
            values.push(hashedPassword);
        }

        if (type) {
            updates.push(`type = $${index++}`);
            values.push(type);
        }

        if (updates.length === 0) {
            return res.status(400).json({ msg: 'No fields to update' });
        }

        const updateQuery = `
            UPDATE users 
            SET 
                ${updates.join(', ')}
            WHERE id = $${index}
            RETURNING id, name, email, address, DOB, phone, profileImage, type
        `;

        values.push(req.user);

        const updatedUser = await client.query(updateQuery, values);

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (oldImagePath && oldImagePath !== updatedUser.rows[0].profileimage) {
            const fullPath = path.join(uploadsPath, path.basename(oldImagePath));
            try {
                await fs.unlink(fullPath);
                console.log(`Successfully deleted old image: ${fullPath}`);
            } catch (err) {
                console.error(`Error deleting old image: ${err.message}`);
            }
        }

        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: err.message });
    }
});

authRouter.get('/api/user/:userId', auth, async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const query = `
        SELECT id, name, email, profileimage, dob, address, phone
        FROM users
        WHERE id = $1
      `;
      const values = [userId];
  
      const result = await client.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      const user = result.rows[0];
  
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileimage,
        dob: user.dob,
        address: user.address,
        phone: user.phone
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = authRouter;
