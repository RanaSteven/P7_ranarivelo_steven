const mysql = require('mysql');
const bcrypt = require('bcrypt'); // Importation du package 'bcrypt'
const jwt = require('jsonwebtoken'); // Importation du package 'jwt'
var passwordValidator = require('password-validator');
const bdd = require('../mysqlConfig');
var schemaPassword = new passwordValidator();

schemaPassword
.is().min(8)                                    // Minimum 8 caractères
.is().max(15)                                   // Maximum 15 caractères
.has().uppercase()                              // Doit avoir des lettres majuscules
.has().lowercase()                              // Doit avoir des lettres minuscules
.has().digits(2)                                // Doit avoir au moins 2 chiffres
.has().not().spaces();                          // Ne doit pas comporter d'espaces

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let parameters = [req.body.prenom, req.body.nom, req.body.email, req.body.pseudo, hash];
            bdd.query ("INSERT INTO Utilisateurs (prenom, nom, email, pseudo, password, droit) VALUES(?, ?, ?, ?, ?, 1)", parameters, (err, res) => {
                if (err) throw err;
            })
            res.json({ status: 'OK', message: 'Inscription réussie !'});
        })
         .catch(error =>{
            res.json({ status: 'invalideUser', message: `Désolé, l'utilisateur n'a pas été créé !`});
        })
};
    
exports.login = (req, res, next) => {
    let parameters = [req.body.email, req.body.password];
    bdd.query ('SELECT * FROM Utilisateurs WHERE email= ?', parameters, (err, results) => { 
    if(results.length == 0){
        res.json({ status: 'userInconnu', message: `Désolé, cet utilisateur n'existe pas.`});
      }else{
bcrypt.compare(req.body.password, results[0].password) // Comparaison du mot de passe saisie avec le hash enregistré en BDD
    .then((valid) => {
        if(!valid){
            console.log('Mot de passe incorrecte');
            return res.json({ status: 'passwordInvalide', message: `Mot de passe incorrect.`});
        }
        res.status(200).json({
            status: 'profilAutorise',
            userId: results[0].id,
            token: jwt.sign(
                { userId: results[0].id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            ),
            nom: results[0].nom,
            prenom: results[0].prenom,
            pseudo: results[0].pseudo
          });
          console.log(results);
        })
        .catch(error => res.status(500).json({ error }));
    }
    if(err){
        res.status(500).json({ error });
    }
})
}

exports.loginAdmin = (req, res, next) => {
    let parameters = [req.body.email, req.body.password];
    bdd.query ('SELECT * FROM Utilisateurs WHERE email= ? AND droit= 0', parameters, (err, results) => { 
    if(results.length == 0){
        res.json({ status: 'userInconnu', message: `Désolé, cet utilisateur n'a pas les droit administrateur.`});
      }else{
bcrypt.compare(req.body.password, results[0].password) // Comparaison du mot de passe saisie avec le hash enregistré en BDD
    .then((valid) => {
        if(!valid){
            console.log('Mot de passe incorrecte');
            return res.json({ status: 'passwordInvalide', message: `Mot de passe incorrect.`});
        }
        res.status(200).json({
            status: 'profilAutorise',
            userId: results[0].id,
            token: jwt.sign(
                { userId: results[0].id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            ),
            nom: results[0].nom,
            prenom: results[0].prenom,
            pseudo: results[0].pseudo
          });
          console.log(results);
        })
        .catch(error => res.status(500).json({ error }));
    }
    if(err){
        res.status(500).json({ error });
    }
})
}
