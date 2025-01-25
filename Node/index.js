const express = require("express");
const cors = require('cors');
const path = require('path');
const client = require('./databasepg');
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});