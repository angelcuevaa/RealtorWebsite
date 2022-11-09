const listingDAL = require('../dal/ListingsDAL');

listingDAL.GetAllListings().then(function(row){
    console.log(row)
}).catch((err) => {throw err});