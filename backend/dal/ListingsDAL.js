let mysql = require('mysql2');
let conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "realtor"
  });
function GetAllListings(){
    return new Promise(function(resolve, reject){
        var query = 'SELECT realtor.listings.listing_price, realtor.listings.listing_description,'+ 
        'realtor.listings.listing_number_of_beds, realtor.listings.listing_number_of_baths, realtor.address.*' +
        ' From realtor.listings inner join realtor.address on realtor.listings.address_id = realtor.address.address_id';

        conn.query(query, function(err, rows, fields){
            if (err){
                return reject(err);
            }
            resolve(rows);
        })
    })
}

function GetListingById(listing_id, callback){
    
    // write query to get listing by id here and address by id
    var query = 'SELECT realtor.listings.*, realtor.address.*' + 
    ' From realtor.listings inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    ' where listings_id = ?';

    console.log(listing_id)
    conn.query(query, [listing_id], function(err, res){
        if (err){
            return callback(err, null)
        }
        return callback(null, res)
    }
    )
}

function UpdateListing(listing, callback){
    console.log("####################")
    console.log(listing)
    console.log("####################")

    // update listing and address by id
    var query = 'update realtor.listings set listing_name = ?, listing_price = ?, listing_description = ?, listing_number_of_beds = ?, listing_number_of_baths = ?, listing_status = ?, address_id = ? where listings_id = ?'

    conn.query(query, [listing.listingName, listing.listingPrice, listing.listingDescription, listing.beds, listing.baths, listing.status,listing.addressId, listing.listingId], function(err, res){
        if (err){
            console.log("efailded");
            return callback(err, null)
        }
        console.log("success listing");
        return callback(null, res)
    })
}


function NewGetAllListings(callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*' +
        ' From realtor.listings inner join realtor.address on realtor.listings.address_id = realtor.address.address_id';
    conn.query(query, function(err, rows){
        if (err){
            return callback(err, null)
        }
        return callback(null, rows)
    })
}
function PostListing(listing, callback){
    //need to get address id to insert listing so insert address first then get the id, then insert listing
    var query = 'insert into realtor.listings (listing_name, listing_price, listing_description, listing_number_of_beds, listing_number_of_baths, listing_status, address_id, date_added)' +
    ' values(?, ?, ?, ?, ?, ?, ?, ?)';

    conn.query(query, [listing.listingName, listing.listingPrice, listing.listingDescription, listing.beds, listing.baths, listing.status, listing.addressId, listing.date], function(err){
        if (err){
            return callback(err, null);
        }
        return callback(null, "saved successfully");
    })
}
function PostAddress(address, callback){
    var query = 'insert into realtor.address (address_id, street, city, state, zipcode)' +
    ' values(?, ?, ?, ?, ?)';

    conn.query(query, [address.addressId, address.street, address.city, address.state, address.zipcode], function(err){
        if (err){
            return callback(err, null)
        }
        return callback(null, "saved successfully")
    });

}
function GetAddressId(address, callback){
    var query = 'select address_id'+
    ' from realtor.address' +
    ' where street = ? AND city = ? AND state = ? AND zipcode = ?'

    conn.query(query, [address.addressId, address.street, address.city, address.state, address.zipcode], function(err, rows){
        if (err){
            return callback(err, null)
        }
        return callback(null, rows)
    });

}
function CheckAddressExist(address_id, callback){
    var query = 'SELECT count(*) from realtor.address where address_id = ?';

    conn.query(query, [address_id], function(err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function UpdateAddress(address, callback){
    var query = 'update realtor.address set street = ?, city = ?, state = ?, zipcode = ? where address_id = ?'

    conn.query(query, [address.street, address.city, address.state, address.zipcode, address.addressId], function(err, res){
        if (err){
            return callback(err, null)
        }
        return callback(null, res)
    })
}

function DeleteListing(listingId, callback){
    var query = 'delete from realtor.listings where listings_id = ?'

    conn.query(query, [listingId], function(err, res){
        if (err){
            return callback(err, null)
        }
        return callback(null, res)
    })
}
function DeleteAddress(addressId, callback){
    var query = 'delete from realtor.address where address_id = ?'

    conn.query(query, [addressId], function(err, res){
        if (err){
            return callback(err, null)
        }
        return callback(null, res)
    })
}
module.exports = {
    GetAllListings,
    GetListingById,
    NewGetAllListings,
    UpdateListing,
    PostAddress,
    GetAddressId,
    PostListing,
    CheckAddressExist,
    UpdateAddress,
    DeleteListing,
    DeleteAddress
};

