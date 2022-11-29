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
        ' From realtor.listings inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id';

        conn.query(query, function(err, rows, fields){
            if (err){
                return reject(err);
            }
            resolve(rows);
        })
    })
}
function NewGetAllListings(callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' ;
    conn.query(query, function(err, rows){
        if (err){
            return callback(err, null)
        }
        return callback(null, rows)
    })
}
function PostListing(listing, callback){
    //need to get address id to insert listing so insert address first then get the id, then insert listing
    var query = 'insert into realtor.listings (listing_name, listing_price, listing_description, listing_number_of_beds, listing_number_of_baths, listing_status, date_added)' +
    ' values(?, ?, ?, ?, ?, ?, ?)';

    //error is here
    conn.query(query, [listing.listingName, listing.listingPrice, listing.listingDescription, listing.beds, listing.baths, listing.status, listing.date], function(err){
        if (err){
            return callback(err, null);
        }
        return callback(null, "saved successfully");
    })
}
function PostAddress(address, callback){
    var query = 'insert into realtor.address (street, city, state, zipcode, listings_id)' +
    ' values(?, ?, ?, ?, ?)';

    conn.query(query, [address.street, address.city, address.state, address.zipcode, address.listingId], function(err){
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
function GetListingId(listing, callback){
    var query = 'select listings_id'+
    ' from realtor.listings' +
    ' where listing_name = ? and listing_price = ? and listing_description = ? and listing_number_of_beds = ? and' +
    ' listing_number_of_baths = ? and listing_status = ?'

    conn.query(query, [listing.listingName, listing.listingPrice, listing.listingDescription, listing.beds, listing.baths, listing.status], function(err, rows){
        if (err){
            return callback(err, null)
        }
        return callback(null, rows)
    });

}
function CheckAddressExist(address, callback){
    var query = 'SELECT count(*) from realtor.address where street = ? and zipcode = ?';

    conn.query(query, [address.street, address.zipcode], function(err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function CheckListingExist(listing, callback){
    var query = 'SELECT count(*) from realtor.listings where listing_name = ? and listing_price = ? and listing_description = ? and listing_number_of_beds = ? and' +
    ' listing_number_of_baths = ? and listing_status = ?';

    conn.query(query, [listing.listingName, listing.listingPrice, listing.listingDescription, listing.beds, listing.baths, listing.status], function(err, res){
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
//more than or equal to price asked for
function GetListingPriceMore(listingPrice, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.listings.listing_price >= ?';

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
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.listings.listing_price <= ?';

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
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.listings.listing_number_of_beds >= ?';

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
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.listings.listing_number_of_beds <= ?';

    conn.query(query, [numberOfBeds], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingBathsMore(numberOfBaths, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.listings.listing_number_of_baths >= ?';

    conn.query(query, [numberOfBaths], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingBathsLess(numberOfBaths, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.listings.listing_number_of_baths <= ?';

    conn.query(query, [numberOfBaths], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingCity(city, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.address.city = ?';

    conn.query(query, [city], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingZipcode(zipcode, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.address.zipcode = ?';

    conn.query(query, [zipcode], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingState(state, callback){
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' + 
    ' From realtor.listings' +
    ' inner join realtor.address on realtor.listings.listing_id = realtor.address.listing_id' +
    ' inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
    ' where realtor.address.state = ?';

    conn.query(query, [state], function (err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function UpdateAddress(street, city, state, zipcode, addressId, callback){
    var query = 'update realtor.address' +
    ' set street = ?, city = ?, state = ?, zipcode = ?' +
    ' where realtor.address.address_id = ?';

    conn.query(query, [street, city, state, zipcode, addressId], function(err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function UpdateListing(listingName, listingPrice, listingDescription, beds, baths, status, dateAdded){
    var query = 'update realtor.listings' +
    ' set listing_name = ?, listing_price = ?, listing_description = ?, listing_number_of_beds = ?,' +
    ' listing_number_of_baths = ?, listing_status = ?, date_added = ?' +
    ' where realtor.listings.listings_id = ?';

    conn.query(query, [listingName, listingPrice, listingDescription, beds, baths, status, addressId, dateAdded]
        , function(err, res){
        if (err){
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function UpdatePhoto(listingId, photoData, photoType, photoId){
    var query = 'update realtor.photos' + 
    ' set listing_id = ?, photo_data = ?, photo_type = ?' + 
    ' where photo_id = ?';

    conn.query(query, [listingId, photoData, photoType, photoId], function(err, res){
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
    DeleteListingPhoto,
    GetListingPriceMore,
    GetListingBedsMore,
    GetListingBathsLess,
    GetListingBathsMore,
    GetListingState,
    GetListingCity,
    GetListingZipcode,
    GetListingBedsLess,
    GetListingPriceLess,
    UpdateAddress,
    UpdatePhoto,
    UpdateListing,
    CheckListingExist,
    GetListingId
};

