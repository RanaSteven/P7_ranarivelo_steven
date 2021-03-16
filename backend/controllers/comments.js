const mysql = require('mysql');
const fs = require('fs');
const bdd = require('../mysqlConfig');

exports.createComment = (req, res, next) => {
    let parameters = [req.body.Posts_idPosts, req.body.Posts_Utilisateurs_id, req.body.Utilisateurs_id, req.body.contents];
    bdd.query ('INSERT INTO Comments (Posts_idPosts, Posts_Utilisateurs_id, Utilisateurs_id, contents) VALUES(?, ?, ?, ?)', parameters, (err, res) => {
        if (err) throw err;
      
    console.log ('Données reçues de Db:');
    console.log (res);
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
    bdd.query ('SELECT * FROM Comments ORDER BY Utilisateurs_id', (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
      });
}