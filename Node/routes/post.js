const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pool = require('../databasepg');

const router = express.Router(); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    const tempFileName = Date.now() + path.extname(file.originalname);
    cb(null, tempFileName);
  }
});

const upload = multer({ storage });

router.post('/createPost', upload.array('images'), async (req, res) => {
  const { title, description, user_id } = req.body; 
  const files = req.files;
  console.log('Function Called');
  try {
    await pool.query('BEGIN');

    const insertPostQuery = `
      INSERT INTO posts (title, description, user_id, likes, like_count)
      VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
    const postResult = await pool.query(insertPostQuery, [
      title, description, user_id, [], 0
    ]);

    const postId = postResult.rows[0].id;

    for (let file of files) {
      const newFileName = `${postId}-${Date.now()}${path.extname(file.originalname)}`;
      const newFilePath = path.join(__dirname, '../uploads', newFileName); 

      fs.renameSync(file.path, newFilePath);

      const insertImageQuery = `
        INSERT INTO images (image_url, post_id)
        VALUES ($1, $2)
      `;
      await pool.query(insertImageQuery, [newFileName, postId]);
    }

    await pool.query('COMMIT');

    res.status(201).json({ message: 'Post created successfully', postId });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/likePost', async (req, res) => {
  const { post_id, user_id } = req.body;
  
  try {
    await pool.query('BEGIN');
    
    const postQuery = `
      SELECT likes, like_count FROM posts WHERE id = $1
    `;
    const postResult = await pool.query(postQuery, [post_id]);
    let likes = postResult.rows[0].likes || [];
    let likeCount = postResult.rows[0].like_count || 0;
    
    let liked = false;
    if (likes.includes(user_id)) {
      likes = likes.filter(id => id !== user_id);
      likeCount--;
    } else {
      likes.push(user_id);
      likeCount++;
      liked = true;
    }
    
    const updatePostQuery = `
      UPDATE posts
      SET likes = $1, like_count = $2
      WHERE id = $3
    `;
    await pool.query(updatePostQuery, [likes, likeCount, post_id]);
    
    await pool.query('COMMIT');
    
    res.status(200).json({ message: 'Post like status updated successfully', liked });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error updating post like status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getAllPosts', async (req, res) => {
  try {
    const postsQuery = `
      SELECT 
        p.id as post_id, 
        p.title, 
        p.description, 
        p.user_id, 
        p.likes, 
        p.like_count, 
        json_agg(
          json_build_object('image_id', i.id, 'image_url', i.image_url)
        ) as images 
      FROM posts p
      LEFT JOIN images i ON p.id = i.post_id
      GROUP BY p.id
      ORDER BY p.id DESC;
    `;

    const result = await pool.query(postsQuery);
    const posts = result.rows;

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.error('Error retrieving posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/getPost/:post_id', async (req, res) => {
  const { post_id } = req.params;

  try {
    const postQuery = `
      SELECT p.id, p.title, p.description, p.user_id, p.like_count, p.likes, 
             json_agg(i.image_url) AS images
      FROM posts p
      LEFT JOIN images i ON p.id = i.post_id
      WHERE p.id = $1
      GROUP BY p.id
    `;
    
    const postResult = await pool.query(postQuery, [post_id]);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ data: postResult.rows[0] });
  } catch (err) {
    console.error('Error fetching post details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/getUsersWithLikes', async (req, res) => {
  try {
    const usersWithLikesQuery = `
      SELECT 
          u.id AS user_id, 
          u.name, 
          COALESCE(SUM(CASE WHEN p.likes IS NOT NULL THEN array_length(p.likes, 1) ELSE 0 END), 0) AS total_likes
      FROM 
          users u
      LEFT JOIN 
          posts p ON u.id = p.user_id
      GROUP BY 
          u.id
      ORDER BY 
          u.name;
    `;

    const result = await pool.query(usersWithLikesQuery);
    const users = result.rows;

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error('Error retrieving users with likes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/search', async (req, res) => {
  const { searchString } = req.body;

  console.log('Received search string:', searchString); 

  if (!searchString) {
    return res.status(400).json({ error: 'Search string is required' });
  }

  try {
    const query = `
      SELECT id
      FROM posts
      WHERE title ILIKE $1 OR description ILIKE $1
    `;
    const values = [`%${searchString}%`];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No matching posts found' });
    }

    const postIds = result.rows.map(row => row.id);
    console.log('Returning the posts',postIds);
    res.json({ post_ids: postIds });
  } catch (err) {
    console.error('Error searching posts:', err.message); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/instruction/:objectName', async (req, res) => {
  const objectName = req.params.objectName; 

  try {
    const query = 'SELECT instruction, problem FROM instructions WHERE object_name = $1';

    const result = await pool.query(query, [objectName]);

    if (result.rows.length > 0) {

      res.status(200).json({
        instruction: result.rows[0].instruction,
        problem: result.rows[0].problem, 
      });
    } else {
      console.log('No object');
      res.status(404).json({ message: 'No instruction found for the given object name.' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'An error occurred while fetching the instruction.' });
  }
});


router.get('/tags/:objectName', async (req, res) => {
  const objectName = req.params.objectName;

  try {
    const query = 'SELECT tags FROM web WHERE object_name = $1';
    const result = await pool.query(query, [objectName]);

    if (result.rows.length > 0) {
      res.status(200).json({
        tags: result.rows[0].tags,
      });
    } else {
      res.status(404).json({ message: 'No tags found for the given object name.' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'An error occurred while fetching the tags.' });
  }
});


module.exports = router;
