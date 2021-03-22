const mysql = require('mysql');
const fs = require('fs');
const bdd = require('../mysqlConfig');

exports.createComment = (req, res, next) => {
    let parameters = [req.body.idPosts, req.body.Utilisateurs_id, req.body.Utilisateur_id, req.body.contents];
    bdd.query ('INSERT INTO Comments (Posts_idPosts, Posts_Utilisateurs_id, id, contents) VALUES(?, ?, ?, ?)', parameters, (err, resPostComment) => {
        if (err) throw err;
      
    console.log ('Données reçues de Db:');
    console.log (resPostComment);
    });
}

exports.modifyComment = (req, res, next) => {
    let parameters = [req.body.contents, req.body.idComments];
    bdd.query ('UPDATE Comments SET contents= ? WHERE idComments= ?', parameters, (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
      });
}

exports.deleteComment = (req, res, next) => {
    let parameters = [req.body.idComments];
    bdd.query ('DELETE FROM Comments WHERE idComments= ?', parameters, (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
      });
}

exports.getAllComments = (req, res, next) => {
    bdd.query ('SELECT * FROM Comments', (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
      });
}

exports.getAllCommentsByPost = (req, res, next) => {
    let parameters = [req.params.Posts_idPosts]
    bdd.query ('SELECT * FROM Comments WHERE Posts_idPosts = ? ORDER BY idComments DESC', parameters, (err, resCommentByPost) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (resCommentByPost);
      });
}