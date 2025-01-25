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



module.exports = authRouter;
