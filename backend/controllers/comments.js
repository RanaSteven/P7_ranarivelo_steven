const mysql = require('mysql');
const fs = require('fs');
const bdd = require('../mysqlConfig');

exports.getAllComments = (req, res, next) => {
  bdd.query ('SELECT * FROM Comments WHERE status_moderation= 0 ORDER BY idComments DESC', (err, resAllComm) => {
      if(err){
          res.status(500).json({err});
          console.log(err)
      }else{
          res.status(200).json(resAllComm);
      }
  })
}

exports.createComment = (req, res, next) => { // Ajouter un commentaire a une publication
  let newComment = {
    Posts_idPosts: req.params.idPosts,
    Posts_Utilisateurs_id: req.params.Posts_Utilisateurs_id,
    Utilisateurs_id: req.params.id,
    contents: req.body.contents,
    status_moderation: 0,
  }
  bdd.query ('INSERT INTO comments SET?', newComment, function(err, results){
    if(err){
      res.status(500).json({err});
    }else{
      res.status(200);
      console.log('Commentaire envoyé')
    }
  })
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