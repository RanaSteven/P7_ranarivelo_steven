const mysql = require('mysql');
const bdd = require('../mysqlConfig');
const bcrypt = require('bcrypt');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
  let response;
  bdd.query ('SELECT * FROM Posts WHERE status_moderation= 1 ORDER BY idPosts DESC', (err, resAllPosts) => {
    if (err){
      throw err;
    }
    else{
      bdd.query ('SELECT * FROM Comments WHERE status_moderation = 1 ORDER BY idComments DESC', (err, resAllComments) => {
      let elements= [];
    resAllPosts.forEach(post => {
      post.comment1 = null;
      post.comment2 = null;
        resAllComments.forEach(comment => {
        if(comment.Posts_idPosts == post.idPosts){
          if(post.comment1 == null){
            post.comment1 = comment.contents;
          }
          else if(post.comment2 == null){
            post.comment2 = comment.contents;
        }
      }
      });
      elements.push(post);
    });
    console.log(elements);
      response = {"posts": resAllPosts, "comment": resAllComments, "elements": elements}
      res.status(200).json(response);
      })
    }
  });
}

exports.getAllIdPosts = (req, res, next) => {
  let response;
  let parameters = [req.params.id];
  bdd.query ('SELECT * FROM Posts WHERE Utilisateurs_id= ? AND status_moderation = 1 ORDER BY idPosts DESC', parameters, (err, resPostsId) => {
    if (err){
      throw err;
    }
    else{
      response = resPostsId;
      res.status(200).json(response);
    }
  });
}

exports.createPost = (req, res, next) => { // Création d'un post
  const newPost = {
    content: req.body.content,
    Utilisateurs_id: req.body.Utilisateurs_id,
    status_moderation: 0,
  }
  console.log(newPost);
  bdd.query ('INSERT INTO posts SET?', newPost, (err, results) => {
    if(err){
      res.status(500).json({err});
      console.log(err)
    }else{
      res.status(200);
    }
  })
}

// exports.createPost = (req, res, next) => {
//     let parameters = [req.body.content, req.body.Utilisateurs_id];
//     bdd.query ('INSERT INTO Posts (content, Utilisateurs_id, status_moderation) VALUES(?, ?, 0)', parameters, (err, res) => {
//         if (err) throw err;
      
//     console.log ('Données reçues de Db:');
//     console.log (res);
//     console.log('publication envoyée !')
//     });
// }

exports.modifyPost = (req, res, next) => {
    let parameters = [req.body.content, req.body.idPosts];
    bdd.query ('UPDATE Posts SET content= ? WHERE idPosts= ?', parameters, (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (req.body.content);
      });
}

exports.deletePost = (req, res, next) => {
    let parameters = [req.body.idPosts];
    bdd.query ('DELETE FROM Posts WHERE idPosts= ?', parameters, (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
      });
}