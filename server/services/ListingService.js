const listingDAL = require('../dal/ListingsDAL');
const ListingController = require('../controllers/ListingController');
var fs = require('fs');

//probs need to make a callback to the controller and handle the data there
function GetAllListings(callback) {
    listingDAL.NewGetAllListings(function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }
        return callback(rows)
    });
}

function GetListingById(requestBody, callback) {
    listingDAL.GetListingById(requestBody.id, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }
        return callback(rows)
    }
    )
}

function UpdateListing(requestBody, files, callback) {
    let address = {
        "lat": parseFloat(requestBody.lat),
        "lng": parseFloat(requestBody.lng),
        "street": requestBody.listing_street,
        "city": requestBody.listing_city,
        "state": requestBody.listing_state,
        "zipcode": parseInt(requestBody.listing_zipcode)
    };

    let listing = {
        'listingId': parseInt(requestBody.listing_id),
        "listingName": requestBody.listing_name,
        "listingPrice": parseInt(requestBody.listing_price),
        "listingDescription": requestBody.listing_description,
        "beds": parseInt(requestBody.listing_number_of_beds),
        "baths": parseInt(requestBody.listing_number_of_baths),
        "status": parseInt(requestBody.listing_status),
        "date": new Date()
    }

    // // need to check if address exists before posting it
    listingDAL.CheckAddressExist(requestBody.address_id, function (err, res) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }
        if (res.length > 0) {
            listingDAL.UpdateAddress(address, requestBody.address_id, function (err, res) {
                if (err) {
                    return callback({
                        "Error": err,
                        "Response": ""
                    })
                }
            })
        }
    })
    listingDAL.UpdateListing(listing, function (err, res) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }
    })

    if (files.length > 0) {
        listingDAL.UpdateListingPhoto(files, requestBody.listing_id, function (err, res) {
            if (err) {
                return callback({
                    "Error": err,
                    "Response": ""
                })
            }
        })
    }

}

function PostListing(requestBody, files, callback) {

    let address = {
        "lat": parseFloat(requestBody.lat),
        "lng": parseFloat(requestBody.lng),
        "street": requestBody.street,
        "city": requestBody.city,
        "state": requestBody.state,
        "zipcode": parseInt(requestBody.zipCode)
    };

    let listing = {
        "listingName": requestBody.listingName,
        "listingPrice": parseInt(requestBody.listingPrice),
        "listingDescription": requestBody.listingDescription,
        "beds": parseInt(requestBody.beds),
        "baths": parseInt(requestBody.baths),
        "status": parseInt(requestBody.status),
        "date": new Date()
    }

    // upload the listing first
    listingDAL.PostListing(listing, function (err, res) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }
        // get the last inserted listing id
        const listingId = res.insertId;

        listingDAL.PostAddress(address, listingId, function (err, res) {
            if (err) {
                return callback({
                    "Error": err,
                    "Response": ""
                })
            }
        })

        listingDAL.PostListingPhoto(files, listingId, function (err, res) {
            if (err) {
                console.log(err);
                return callback({
                    "Error": err,
                    "Response": ""
                })
            } else {
                // return the image id
                const imageId = res.insertId;
            }
        })
    });


}
function DeleteListing(requestBody, callback) {

    console.log(requestBody);

    listingDAL.DeleteListing(requestBody.listings_id, function (err, response) {
        if (err) {
            return callback({
                "Error": err,
                "Rows Deleted": ""
            })
        }
        return callback({
            "Error": "",
            "Rows Deleted": response.affectedRows
        });
    })

    listingDAL.DeleteAddress(requestBody.listings_id, function (err, response) {
        if (err) {
            return callback({
                "Error": err,
                "Rows Deleted": ""
            })
        }
        return callback({
            "Error": "",
            "Rows Deleted": response.affectedRows
        });
    })

    listingDAL.DeleteListingPhoto(requestBody.listings_id, function (err, response) {
        if (err) {
            return callback({
                "Error": err,
                "Rows Deleted": ""
            })
        }
        return callback({
            "Error": "",
            "Rows Deleted": response.affectedRows
        });
    })
}
function DeleteAddress(requestBody, callback) {
    listingDAL.DeleteAddress(requestBody.addressId, function (err, response) {

        if (err) {
            return callback({
                "Error": err,
                "Rows Deleted": ""
            })
        }
        return callback({
            "Error": "",
            "Rows Deleted": response.affectedRows
        });
    })
}
function DeleteAddressAndListing(requestBody, callback) {
    DeleteAddress(requestBody, function (response) {
        if (response.Error != null) {
            return callback(response);
        }
        DeleteListing(requestBody, function (response) {
            return callback(response);
        })
    })

}
function PostListingPhoto(body, callback) {
    //need to store data and type of pics in own arrays then call function to store them in database
    // var listingId = requestBody.listingId;

    listingDAL.PostListingPhoto(body.image, function (err, res) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }
        return callback({
            "Error": "",
            "Response": res
        });
    })
}
function GetListingPhoto(requestBody, callback) {
    listingDAL.GetListingPhotos(requestBody.listingId, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    });
}
function DeleteListingPhoto(requestBody, callback) {
    listingDAL.DeleteListingPhoto(requestBody.photoId, function (err, res) {
        if (err) {
            return callback({
                "Error": err,
                "Rows Deleted": ""
            })
        }
        return callback({
            "Error": "",
            "Rows Deleted": res.affectedRows
        });
    })
}
function GetListingPriceMore(requestBody, callback) {
    listingDAL.GetListingPriceMore(requestBody.listingPrice, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}
function GetListingPriceLess(requestBody, callback) {
    listingDAL.GetListingPriceLess(requestBody.listingPrice, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}
function GetListingBedsMore(requestBody, callback) {
    listingDAL.GetListingBedsMore(requestBody.beds, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}
function GetListingBedsLess(requestBody, callback) {
    listingDAL.GetListingBedsLess(requestBody.beds, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}
function GetListingBathsMore(requestBody, callback) {
    listingDAL.GetListingBathsMore(requestBody.baths, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}
function GetListingBathsLess(requestBody, callback) {
    listingDAL.GetListingBathsLess(requestBody.baths, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}
function GetListingCity(requestBody, callback) {
    listingDAL.GetListingCity(requestBody.city, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}
function GetListingZipcode(requestBody, callback) {
    listingDAL.GetListingZipcode(requestBody.zipcode, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}
function GetListingState(requestBody, callback) {
    listingDAL.GetListingState(requestBody.state, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}

SearchListing = function (requestBody, callback) {
    listingDAL.SearchListing(requestBody, function (err, rows) {
        if (err) {
            return callback({
                "Error": err,
                "Response": ""
            })
        }

        return callback(rows)
    })
}

//need to do update listings and get specific types of listings based on location, status price, etc.
//for update listings, need to send elements that werent changed with the ones that were changed
//update with pictures 
//need to return pics when getting listings

module.exports = {
    GetAllListings,
    GetListingById,
    UpdateListing,
    PostListing,
    DeleteListing,
    DeleteAddress,
    DeleteAddressAndListing,
    PostListingPhoto,
    GetListingPhoto,
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
    SearchListing
}
