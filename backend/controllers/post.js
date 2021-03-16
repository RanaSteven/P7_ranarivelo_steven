const mysql = require('mysql');
const fs = require('fs');
const bdd = require('../mysqlConfig');

exports.createPost = (req, res, next) => {
    let parameters = [req.body.title, req.body.content, req.body.Utilisateurs_id];
    bdd.query ('INSERT INTO Posts (title, content, Utilisateurs_id) VALUES(?, ?, ?)', parameters, (err, res) => {
        if (err) throw err;
      
    console.log ('Données reçues de Db:');
    console.log (res);
    });
}

exports.modifyPost = (req, res, next) => {
    let parameters = [req.body.content, req.body.idPosts];
    bdd.query ('UPDATE Posts SET content= ? WHERE idPosts= ?', parameters, (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
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

exports.getAllIdPosts = (req, res, next) => {
    let parameters = [req.body.Utilisateurs_id];
    bdd.query ('SELECT * FROM Posts WHERE Utilisateurs_id= ?', parameters, (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
      });
}

exports.getAllPosts = (req, res, next) => {
    bdd.query ('SELECT * FROM Posts', (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
      });
}