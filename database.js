let mysql = require('mysql2');
let conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "realtor"
  });

conn.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
})