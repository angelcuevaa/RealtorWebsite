let mysql = require('mysql2');
let conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "realtor"
  });

  function PostUser(username, hash){
    conn.query(
        "INSERT INTO realtor.users (username, password) VALUES (?,?)",
        [username, hash],
        (err, result) => {
          console.log(err);
        }
      );
  }
module.exports = {
    PostUser
}