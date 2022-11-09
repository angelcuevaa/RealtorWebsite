let mysql = require('mysql2');
let conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Fearme02",
    database: "realtor"
  });

GetAllListings();

function GetAllListings(){
    conn.query('SELECT realtor.listings.listing_price, realtor.listings.listing_description,'+ 
    'realtor.listings.listing_number_of_beds, realtor.listings.listing_number_of_baths, realtor.address.*' +
    ' From realtor.listings inner join realtor.address on realtor.listings.address_id = realtor.address.address_id', function(err, res){
        console.log(res)
    });
}
