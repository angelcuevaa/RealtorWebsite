let mysql = require('mysql2');
let conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Fearme02",
    database: "realtor"
  });

conn.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
})