let mysql = require('mysql2');
let conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Pass123!@123",
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
//more than or equal to price asked for
function GetListingPriceMore(listingPrice, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.listings.listing_price >= ?';

    conn.query(query, [listingPrice], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
//less than or equal to price asked for
function GetListingPriceLess(listingPrice, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.listings.listing_price <= ?';

    conn.query(query, [listingPrice], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
//more than or equal to numberofbeds asked for
function GetListingBedsMore(numberOfBeds, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.listings.listing_number_of_beds >= ?';

    conn.query(query, [numberOfBeds], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
//less than or equal to numberofbeds asked for
function GetListingBedsLess(numberOfBeds, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.listings.listing_number_of_beds <= ?';

    conn.query(query, [numberOfBeds], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingBathsMore(numberOfBaths, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.listings.listing_number_of_baths >= ?';

    conn.query(query, [numberOfBaths], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingBathsLess(numberOfBaths, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.listings.listing_number_of_baths <= ?';

    conn.query(query, [numberOfBaths], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingCity(city, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.address.city = ?';

    conn.query(query, [city], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingZipcode(zipcode, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.address.zipcode = ?';

    conn.query(query, [zipcode], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingState(state, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    'From realtor.listings' +
    'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
    'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    'where realtor.address.state = ?';

    conn.query(query, [state], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
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
    DeleteAddress,
    PostListingPhoto,
    GetListingPhotos,
    DeleteAddress,
    DeleteListingPhoto,
    GetListingPriceMore,
    GetListingBedsMore,
    GetListingBathsLess,
    GetListingBathsMore,
    GetListingState,
    GetListingCity,
    GetListingZipcode,
    GetListingBedsLess,
    GetListingPriceLess
};

