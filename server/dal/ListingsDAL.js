const { ES } = require('aws-sdk');
let mysql = require('mysql2');
const conn = require('../database');

function GetAllListings() {
    return new Promise(function (resolve, reject) {
        var query = 'SELECT realtor.listings.listing_price, realtor.listings.listing_description,' +
            'realtor.listings.listing_number_of_beds, realtor.listings.listing_number_of_baths, realtor.photos.*' +
            ' From realtor.listings inner join realtor.photos on realtor.listings.photo_id = realtor.photos.id';

        conn.query(query, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

function GetListingById(listing_id, callback) {
    // write query to get all listings here and get address and all images by listing id
    var query = 'SELECT * FROM realtor.listings LEFT JOIN realtor.images ON realtor.listings.listing_id = realtor.images.listing_id LEFT JOIN realtor.address ON realtor.listings.listing_id = realtor.address.listing_id WHERE realtor.listings.listing_id = ?';

    conn.query(query, [listing_id], function (err, res) {
        if (err) {
            return callback(err, null)
        }
        const listing = res.reduce((acc, row) => {
            const listing = acc.find(list => list.listing_id === row.listing_id);
            if (listing) {
                listing.images.push({ filename: row.listing_filename, mimetype: row.listing_mimetype, id: row.image_id });
            } else {
                acc.push({
                    listing_id: row.listing_id,
                    listing_name: row.listing_name,
                    listing_price: row.listing_price,
                    listing_description: row.listing_description,
                    listing_number_of_beds: row.listing_number_of_beds,
                    listing_number_of_baths: row.listing_number_of_baths,
                    listing_status: row.listing_status,
                    listing_date: row.listing_date,
                    address_id: row.address_id,
                    listing_state: row.listing_state,
                    listing_city: row.listing_city,
                    listing_street: row.listing_street,
                    listing_zipcode: row.listing_zipcode,
                    listing_lat: row.listing_lat,
                    listing_lng: row.listing_lng,
                    images: [{ filename: row.listing_filename, mimetype: row.listing_mimetype, id: row.image_id }]
                });
            }
            return acc;
        }, []);
        return callback(null, listing)
    }
    )
}

function UpdateListing(listing, callback) {
    console.log(listing);
    // update listing and address by id
    var query = 'update realtor.listings set listing_name = ?, listing_price = ?, listing_description = ?, listing_number_of_beds = ?, listing_number_of_baths = ?, listing_status = ?, listing_date = ? where listing_id = ?';

    conn.query(query, [listing.listingName, listing.listingPrice, listing.listingDescription, listing.beds, listing.baths, listing.status, listing.date, listing.listingId], function (err) {
        if (err) {
            return callback(err, null)
        }
        return callback(null, "updated successfully");
    }
    )

}


function NewGetAllListings(callback) {
    // write query to get all listings here and get address and all images by listing id
    var query = 'SELECT * FROM realtor.listings LEFT JOIN realtor.images ON realtor.listings.listing_id = realtor.images.listing_id LEFT JOIN realtor.address ON realtor.listings.listing_id = realtor.address.listing_id';

    conn.query(query, function (err, results) {
        if (err) {
            console.log(err);
            return callback(err, null)
        }

        // group the images by listing id
        // group the images by the person_id
        const listings = results.reduce((acc, row) => {
            const listing = acc.find(list => list.listing_id === row.listing_id);
            if (listing) {
                listing.images.push({ filename: row.listing_filename, mimetype: row.listing_mimetype, id: row.image_id });
            } else {
                acc.push({
                    listing_id: row.listing_id,
                    listing_name: row.listing_name,
                    listing_price: row.listing_price,
                    listing_description: row.listing_description,
                    listing_number_of_beds: row.listing_number_of_beds,
                    listing_number_of_baths: row.listing_number_of_baths,
                    listing_status: row.listing_status,
                    listing_date: row.listing_date,
                    address_id: row.address_id,
                    listing_state: row.listing_state,
                    listing_city: row.listing_city,
                    listing_street: row.listing_street,
                    listing_zipcode: row.listing_zipcode,
                    listing_lat: row.listing_lat,
                    listing_lng: row.listing_lng,
                    images: [{ filename: row.listing_filename, listing_mimetype: row.listing_mimetype, id: row.image_id }]
                });
            }
            return acc;
        }, []);

        return callback(null, listings)
    })
}
function PostListing(listing, callback) {

    let query = 'insert into realtor.listings (listing_name, listing_price, listing_description, listing_number_of_beds, listing_number_of_baths, listing_status, listing_date)' +
        ' values(?, ?, ?, ?, ?, ?, ?)';

    conn.query(query, [listing.listingName, listing.listingPrice, listing.listingDescription, listing.beds, listing.baths, listing.status, listing.date], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function PostAddress(address, listingId, callback) {
    var query = 'insert into realtor.address (listing_id, listing_state, listing_city, listing_street, listing_zipcode, listing_lat, listing_lng)' +
        ' values(?, ?, ?, ?, ?, ?, ?)';

    conn.query(query, [listingId, address.state, address.city, address.street, address.zipcode, address.lat, address.lng], function (err, res) {
        if (err) {
            return callback(err, null)
        }
        return callback(null, res);
    });

}
function GetAddressId(address, callback) {
    var query = 'select address_id' +
        ' from realtor.address' +
        ' where street = ? AND city = ? AND state = ? AND zipcode = ?'

    conn.query(query, [address.street, address.city, address.state, address.zipcode], function (err, rows) {
        if (err) {
            return callback(err, null)
        }
        return callback(null, rows)
    });

}

function GetListingPhotoId(image, callback) {
    var query = 'select id from realtor.photos where data = ?';

    conn.query(query, [image.image], function (err, rows) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, rows);
    })
}

function CheckAddressExist(address_id, callback) {
    var query = 'SELECT count(*) from realtor.address where address_id = ?';

    conn.query(query, [address_id], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function UpdateAddress(address, address_id, callback) {

    let id = parseInt(address_id);

    var query = 'update realtor.address set listing_street = ?, listing_city = ?, listing_state = ?, listing_zipcode = ?, listing_lat = ?, listing_lng = ? where address_id = ?'


    conn.query(query, [address.street, address.city, address.state, address.zipcode, address.lat, address.lng, parseInt(address_id)], function (err, res) {
        if (err) {
            return callback(err, null)
        }
        return callback(null, res)
    })
}

function DeleteListing(listingId, callback) {
    // delete listing, address, and images table by listing id
    let query = 'DELETE FROM realtor.listings WHERE listing_id = ?';

    conn.query(query, [listingId], function (err, res) {
        if (err) {
            return callback(err, null)
        }
        return callback(null, res)
    })
}
function DeleteAddress(listing_id, callback) {
    var query = 'delete from realtor.address where listing_id = ?'

    conn.query(query, [listing_id], function (err, res) {
        if (err) {
            return callback(err, null)
        }
        return callback(null, res)
    })
}

function PostListingPhoto(files, listingId, callback) {
    var query = 'INSERT INTO realtor.images (listing_id, listing_filename, listing_mimetype) VALUES ?'

    // insert multiple images into database
    let images = files.map(file => [listingId, file.filename, file.mimetype]);

    conn.query(query, [images], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function UpdateListingPhoto(files, listingId, callback) {
    // delete all images from database before inserting new ones
    var query = 'delete from realtor.images where listing_id = ?'
    conn.query(query, [listingId], function (err, res) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        PostListingPhoto(files, listingId, function (err, res) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, res);
        })
    })
}

function GetListingPhotos(listingId, callback) {
    var query = 'SELECT * FROM realtor.photos where id = ?';

    conn.query(query, [listingId], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        // return callback(null, res);
        return callback(null, res[0].data);
    })
}

function DeleteListingPhoto(listing_id, callback) {
    var query = 'delete from realtor.images where listing_id = ?';

    conn.query(query, [listing_id], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
//more than or equal to price asked for
function GetListingPriceMore(listingPrice, callback) {
    var query = 'SELECT * FROM realtor.listings where listing_price >= ?';

    conn.query(query, [listingPrice], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
//less than or equal to price asked for
function GetListingPriceLess(listingPrice, callback) {
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' +
        'From realtor.listings' +
        'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
        'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
        'where realtor.listings.listing_price <= ?';

    conn.query(query, [listingPrice], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
//more than or equal to numberofbeds asked for
function GetListingBedsMore(numberOfBeds, callback) {
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' +
        'From realtor.listings' +
        'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
        'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
        'where realtor.listings.listing_number_of_beds >= ?';

    conn.query(query, [numberOfBeds], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
//less than or equal to numberofbeds asked for
function GetListingBedsLess(numberOfBeds, callback) {
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' +
        'From realtor.listings' +
        'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
        'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
        'where realtor.listings.listing_number_of_beds <= ?';

    conn.query(query, [numberOfBeds], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingBathsMore(numberOfBaths, callback) {
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' +
        'From realtor.listings' +
        'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
        'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
        'where realtor.listings.listing_number_of_baths >= ?';

    conn.query(query, [numberOfBaths], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingBathsLess(numberOfBaths, callback) {
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' +
        'From realtor.listings' +
        'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
        'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
        'where realtor.listings.listing_number_of_baths <= ?';

    conn.query(query, [numberOfBaths], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingCity(city, callback) {
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' +
        'From realtor.listings' +
        'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
        'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
        'where realtor.address.city = ?';

    conn.query(query, [city], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingZipcode(zipcode, callback) {
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' +
        'From realtor.listings' +
        'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
        'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
        'where realtor.address.zipcode = ?';

    conn.query(query, [zipcode], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}
function GetListingState(state, callback) {
    var query = 'SELECT realtor.listings.*, realtor.address.*, realtor.photos.*' +
        'From realtor.listings' +
        'inner join realtor.address on realtor.listings.address_id = realtor.address.address_id' +
        'inner join realtor.photos on realtor.listings.listings_id = realtor.photos.listing_id' +
        'where realtor.address.state = ?';

    conn.query(query, [state], function (err, res) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function SearchListing(listing, callback) {

    var query = "SELECT * FROM realtor.listings LEFT JOIN realtor.images ON realtor.listings.listing_id = realtor.images.listing_id LEFT JOIN realtor.address ON realtor.listings.listing_id = realtor.address.listing_id where realtor.listings.listing_price >= 0 and realtor.listings.listing_price <= 10000 or realtor.listings.listing_number_of_beds >= 1 and realtor.listings.listing_number_of_beds <= 1 or realtor.listings.listing_number_of_baths >= 1 and realtor.listings.listing_number_of_baths <= 1 or  realtor.address.listing_city = 'Park' or realtor.address.listing_zipcode = 1234 or realtor.address.listing_state = 'CA'"
        

    conn.query(query, [listing.minPrice, listing.maxPrice, listing.minBeds, listing.maxBeds, listing.minBaths, listing.maxBaths, listing.city, listing.zipcode, listing.state], function (err, res) {
        if (err) {
        console.log(err);

            return callback(err, null);
        }
        
        const listings = res.reduce((acc, row) => {
            const listing = acc.find(list => list.listing_id === row.listing_id);
            if (listing) {
                listing.images.push({ filename: row.listing_filename, mimetype: row.listing_mimetype, id: row.image_id });
            } else {
                acc.push({
                    listing_id: row.listing_id,
                    listing_name: row.listing_name,
                    listing_price: row.listing_price,
                    listing_description: row.listing_description,
                    listing_number_of_beds: row.listing_number_of_beds,
                    listing_number_of_baths: row.listing_number_of_baths,
                    listing_status: row.listing_status,
                    listing_date: row.listing_date,
                    address_id: row.address_id,
                    listing_state: row.listing_state,
                    listing_city: row.listing_city,
                    listing_street: row.listing_street,
                    listing_zipcode: row.listing_zipcode,
                    listing_lat: row.listing_lat,
                    listing_lng: row.listing_lng,
                    images: [{ filename: row.listing_filename, listing_mimetype: row.listing_mimetype, id: row.image_id }]
                });
            }
            return acc;
        }, []);

        return callback(null, listings);
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
    UpdateListingPhoto,
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
    SearchListing,
    GetListingPhotoId
};

