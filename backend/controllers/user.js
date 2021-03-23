const mysql = require('mysql');
const fs = require('fs');
const bdd = require('../mysqlConfig');
const bcrypt = require('bcrypt');

exports.getProfile = (req, res, next) => {
    let response;
    let parameters = [req.params.id];
    bdd.query ("SELECT prenom, nom, email, pseudo FROM Utilisateurs WHERE id = ?", parameters, (err, result) => {
      if (err){
        throw err;
      }
      else{
        response = result;
        res.status(200).json(response);
      }
    });
}

exports.modifyPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    let parameters = [hash, req.params.id];
    bdd.query ('UPDATE Utilisateurs SET password = ? WHERE id = ?', parameters, (err, resPassword) => { 
      if(err){
        res.status(500).json({err});
        console.log(err)
      }
      else{
        res.status(200).json(resPassword);
      }
    })
  })
  .catch(error => res.status(500).json({error}));
}

exports.modifyProfile = (req, res, next) => { // Modifier les données d'un utilisateurs selon le critère souhaité
    let parameters = [req.body.prenom, req.body.nom, req.body.pseudo, req.params.id];
    bdd.query("UPDATE Utilisateurs SET prenom = ?, nom = ?, pseudo = ? WHERE id= ?", parameters, (err, res) => {
      if(err) throw err;
      console.log(res);
    })
}

exports.deleteProfile = (req, res, next) => {
  let parameters = [req.params.id];
  bdd.query ("DELETE FROM Comments WHERE Posts_Utilisateurs_id = ?", parameters, (err, results) => {
    if(err){
      res.status(500).json({err});
      console.log(err)
    }else{
      bdd.query ("DELETE FROM Posts WHERE Utilisateurs_id = ?", parameters, (err, results) => {
        if(err){
          res.status(500).json({err});
          console.log(err)
        }else{
          bdd.query ("DELETE FROM Utilisateurs WHERE id = ?", parameters, (err, results) => {
            if(err){
              res.status(500).json({err});
              console.log(err)
            }
          })
        }
      })
    }
  })
}