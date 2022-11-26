let mysql = require('mysql2');
let conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
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

    //error is here
    conn.query(query, [listing.listingName, listing.listingPrice, listing.listingDescription, listing.beds, listing.baths, listing.status, listing.addressId, listing.date], function(err){
        if (err){
            return callback(err, null);
        }
        return callback(null, "saved successfully");
    })
}
function PostAddress(address, callback){
    var query = 'insert into realtor.address (street, city, state, zipcode)' +
    ' values(?, ?, ?, ?)';

    conn.query(query, [address.street, address.city, address.state, address.zipcode], function(err){
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

    conn.query(query, [address.street, address.city, address.state, address.zipcode], function(err, rows){
        if (err){
            return callback(err, null)
        }
        return callback(null, rows)
    });

}
function CheckAddressExist(street, callback){
    var query = 'SELECT count(*) from realtor.address where street = ?';

    conn.query(query, [street], function(err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
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
function PostListingPhoto(listingId, photoData, photoType, callback){
    var query = 'insert into realtor.photos (listing_id, photo_data, photo_type)' +
    'values(?, ?, ?)'

    conn.query(query, [listingId, photoData, photoType], function(err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingPhotos(listingId, callback){
    var query = 'SELECT * FROM realtor.photos where listing_id = ?';

    conn.query(query, [listingId], function(err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function DeleteListingPhoto(photoId, callback){
    var query = 'delete from realtor.photos where photo_id = ?';

    conn.query(query, [photoId], function(err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}

module.exports = {
    GetAllListings,
    NewGetAllListings,
    PostAddress,
    GetAddressId,
    PostListing,
    CheckAddressExist,
    DeleteListing,
    DeleteAddress,
    PostListingPhoto,
    GetListingPhotos,
    DeleteAddress,
    DeleteListingPhoto
};

