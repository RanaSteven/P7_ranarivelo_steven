const mysql = require('mysql');
const fs = require('fs');
const bdd = require('../mysqlConfig');
const jwtAuth = require('../middleware/jwtAuth');

exports.getAllProfiles = (req, res, next) => {
    bdd.query ("SELECT * FROM Utilisateurs", (err, res) => {
        if (err) throw err;
    //console.log ('Utilisateur créé !');
    console.log (res);
    })
}

exports.getProfile = (req, res, next) => {
    let parameters = [req.body.id];
    bdd.query ("SELECT * FROM Utilisateurs WHERE id= ?", parameters, (err, res) => {
        if (err) throw err;
        console.log(res);
    })
}

exports.modifyProfile = (req, res, next) => {
    let parameters = [req.body.nom, req.body.prenom, req.body.email, req.body.pseudo, req.params.id];
    bdd.query("UPDATE Utilisateurs SET nom= ?, prenom= ?, email= ?, pseudo= ? WHERE id= ?", (err, res) => {
        if (err) throw err;
        //res.send("Profil modifié !");
        console.log(result);
    })
}

  exports.deleteProfile = (req, res, next) => {
    let parameters = [req.params.id];
    bdd.query ("DELETE FROM Utilisateurs WHERE id= ?", (err, res) => {
        if (err) throw err;
        //res.send("Profil supprimé !");
        console.log(result);
    })
}