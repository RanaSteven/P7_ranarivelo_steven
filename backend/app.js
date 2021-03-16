const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const bdd = require('./mysqlConfig'); 
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');
const postRoutes = require('./routes/posts');
const res = require('./controllers/user');

app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);
app.use('/post', postRoutes);
console.log(res);


module.exports = app;
