const mysql = require('mysql');


const bdd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "icecream94",
  database: "Groupomania",
})

bdd.connect(function(error) {
  if (error) throw error;
  else console.log("Connected to the MySQL database!");
});

module.exports = bdd;