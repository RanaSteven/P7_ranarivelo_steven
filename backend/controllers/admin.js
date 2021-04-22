const mysql = require('mysql');
const bdd = require('../mysqlConfig');
const bcrypt = require('bcrypt');
const fs = require('fs');


exports.getAllAdminPosts = (req, res, next) => {
  let response;
  bdd.query ('SELECT * FROM Posts WHERE status_moderation= 0 ORDER BY idPosts DESC', (err, resAdminGetPosts) => {
    if (err){
      throw err;
    }
    else{
      response = resAdminGetPosts;
      res.status(200).json(response);

    }
  });
}

exports.validePost = (req, res, next) => {
      let parameters = req.params.idPosts;
    bdd.query ('UPDATE Posts SET status_moderation = 1 WHERE idPosts = ?', parameters, (err, res) => {
        if (err) throw err;
      
      console.log ('Données reçues de Db:');
      console.log (res);
      });
}

exports.deletePost = (req, res, next) => {
  let parameters = req.params.idPosts;
bdd.query ('DELETE FROM Posts WHERE idPosts = ?', parameters, (err, res) => {
    if (err) throw err;
  
  console.log ('Données reçues de Db:');
  console.log (res);
  });
}

exports.valideComment = (req, res, next) => {
  let parameters = req.params.idComments;
bdd.query ('UPDATE Comments SET status_moderation = 1 WHERE idComments = ?', parameters, (err, res) => {
    if (err) throw err;
  
  console.log ('Données reçues de Db:');
  console.log (res);
  });
}

exports.deleteComment = (req, res, next) => {
  let parameters = req.params.idComments;
bdd.query ('DELETE FROM Comments WHERE idComments = ?', parameters, (err, res) => {
    if (err) throw err;
  
  console.log ('Données reçues de Db:');
  console.log (res);
  });
}