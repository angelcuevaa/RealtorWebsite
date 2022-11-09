let mysql = require('mysql');
let conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Fearme02",
    database: "realtor"
  });

conn.query ('select* from realtor.listings', (err, res) =>{
    return console.log(res);
});