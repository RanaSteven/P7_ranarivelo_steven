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
            bdd.query ("INSERT INTO Utilisateurs (prenom, nom, email, pseudo, password) VALUES(?, ?, ?, ?, ?)", parameters, (err, res) => {
                if (err) throw err;
                    
        console.log ('Utilisateur créé !');
        console.log (res);
        });
    })
};
    
exports.login = (req, res, next) => {
    let parameters = [req.body.email, req.body.pseudo, req.body.password];
    bdd.query ('SELECT * FROM Utilisateurs WHERE email= ? OR pseudo= ?', parameters, (err, results) => {
        if (err) throw err;
        console.log(results[0].pseudo);
        console.log(results[0].password);
        console.log(req.body.password);    

if(results){
    bcrypt.compare(req.body.password, results[0].password) // Comparaison du mot de passe saisie avec le hash enregistré en BDD
    .then((valid) => {
        if(!valid){
            console.log('Mot de passe incorrecte');
            return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
            userId: results[0].id,
            token: jwt.sign(
                { userId: results[0].id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '1h' }
            ),
            pseudo: results[0].pseudo
          });
          console.log(results);
        })
    .catch(error => {
        console.log('Erreur');
    })
}
})
}

// if(results.length == 0){
//     res.json({ statut: 'inconnu', message: `Désolé, cet utilisateur n'existe pas.`});
//   }else{
//     bcrypt.compare(req.body.password, results[0].password)
//     .then(valid => {
//       if (!valid) {
//         return res.json({ statut: 'pwdInvalide', message: 'Mot de passe incorrect !' });
//       }
//       res.status(200).json({
//         statut: 'profilValide',
//         userId: results[0].id,
//         token: jwt.sign(
//           {userId: results[0].id},
//           'RANDOM_TOKEN_SECRET',
//           {expiresIn: '24h'}
//         ),
//         nom: results[0].nom,
//         prenom: results[0].prenom,
//         urlPhotoProfil: results[0].url_photo_profil
//       });
//       var sql = `UPDATE users SET derniere_connexion = ` + `'` + new Date().getFullYear() + `-` + (new Date().getMonth()+1) + `-` + new Date().getDate() + ` ` + new Date().getHours() + `:` + new Date().getMinutes() + `:` + new Date().getSeconds() + `'` + ` WHERE id= ` + results[0].id;
//       config.connection.query (sql, results[0].id, function(err, results){
//         if(err) throw err;
//       })
//     })
//     .catch(error => res.status(500).json({ error }));
//   }
//   if(err){
//     res.status(500).json({ error });
//   }

// if (req.body.pseudo && req.body.email !== results[0].pseudo && results[0].email) {
//     throw 'Nom d\'utilisateur introuvable !';
//   } else {
//     next();
//   }
// } catch {
//   res.status(401).json({
//     error: new Error('Requête invalide !')
//   });
// }

// req.body.email || req.body.pseudo, results[0].email || results[0].pseudo
//     .then((valid) =>{
//         if(!valid){
//             console.log('Email ou Pseudo incorrect !');
//             return res.status(401).json({ error: "Email ou Pseudo incorrect !" });
//     }})

