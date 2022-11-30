const listingDAL = require('../dal/ListingsDAL');
const ListingController = require('../controllers/ListingController');
const { default: request } = require('sync-request');

//probs need to make a callback to the controller and handle the data there
function GetAllListings(callback){
    listingDAL.NewGetAllListings(function(err, rows){
        if (err){
            return callback({
                "Error" : err,
                "Response" : ""
            })
        }
       
       return callback(rows)
    });
}

function GetListingById(requestBody, callback){
    listingDAL.GetListingById(requestBody.id, function(err, rows){
        if (err){
            return callback({
                "Error" : err,
                "Response" : ""
            })
        }
        return callback(rows)
    }
    )
}

function UpdateListing(requestBody, callback){
    var address = {
        "addressId" : requestBody.addressId,
        "street" : requestBody.street,
        "city" : requestBody.city,
        "state" : requestBody.state,
        "zipcode" : requestBody.zipcode
    };
    //need to check if address exists before posting it
    listingDAL.CheckAddressExist(address.addressId, function(err, res){
        if (err){
            return callback({
                "Error" : err,
                "Response" : ""
            })
        }
        else{
            var count = res[0]['count(*)'];
            
            if (count == 0){
                listingDAL.PostAddress(address, function(err, res){
                    if (err){
                        return callback({
                            "Error" : err,
                            "Response" : ""
                        })
                    }
                })
            }

            if(count == 1) {
                listingDAL.UpdateAddress(address, function(err, res){
                    if (err){
                        return callback({
                            "Error" : err,
                            "Response" : ""
                        })
                    }
                }
                )
            }
        }
    })
   
    listingDAL.GetAddressId(address, function(err, res){
        if (err){
            return callback({
                "Error" : err,
                "Response" : ""
            })
        }

        // store listing now since we have the addressID
        var listing = {
            "listingId": requestBody.listingId,
            "listingName" : requestBody.listingName,
            "listingPrice" : requestBody.listingPrice,
            "listingDescription" : requestBody.listingDescription,
            "beds" : requestBody.beds,
            "baths" : requestBody.baths,
            "status" : requestBody.status,
            "addressId" : requestBody.addressId,
            "date" : new Date()
        };
        listingDAL.UpdateListing(listing, function(err, res){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
            return callback({
            "Error" : "",
            "Response" : res
        });
        })
    })
}

function PostListing(requestBody, callback){
    var address = {
        "addressId" : requestBody.addressId,
        "street" : requestBody.street,
        "city" : requestBody.city,
        "state" : requestBody.state,
        "zipcode" : requestBody.zipcode
    };
    //need to check if address exists before posting it
    listingDAL.CheckAddressExist(address.addressId, function(err, res){
        if (err){
            return callback({
                "Error" : err,
                "Response" : ""
            })
        }
        else{
            var count = res[0]['count(*)'];
            if (count == 0){
                listingDAL.PostAddress(address, function(err, res){
                    if (err){
                        return callback({
                            "Error" : err,
                            "Response" : ""
                        })
                    }
                })
            }
        }
    })
   
    listingDAL.GetAddressId(address, function(err, res){
        if (err){
            return callback({
                "Error" : err,
                "Response" : ""
            })
        }

        // store listing now since we have the addressID
        var listing = {
            "listingName" : requestBody.listingName,
            "listingPrice" : requestBody.listingPrice,
            "listingDescription" : requestBody.listingDescription,
            "beds" : requestBody.beds,
            "baths" : requestBody.baths,
            "status" : requestBody.status,
            "addressId" : requestBody.addressId,
            "date" : new Date()
        };
        listingDAL.PostListing(listing, function(err, res){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
            return callback({
            "Error" : "",
            "Response" : res
        });
        })
    })
}
function DeleteListing(requestBody, callback){

    listingDAL.DeleteListing(requestBody.listings_id, function(err, response){
    
        if (err){
            return callback({
                "Error" : err,
                "Rows Deleted" : ""
            })
        }
        return callback({
            "Error" : "",
            "Rows Deleted" : response.affectedRows
        });
    })
}
function DeleteAddress(requestBody, callback){
    listingDAL.DeleteAddress(requestBody.addressId, function(err, response){
    
        if (err){
            return callback({
                "Error" : err,
                "Rows Deleted" : ""
            })
        }
        return callback({
            "Error" : "",
            "Rows Deleted" : response.affectedRows
        });
    })
}
function DeleteAddressAndListing(requestBody, callback){
    DeleteAddress(requestBody, function(response){
        if (response.Error != null){
            return callback (response);
        }
        DeleteListing(requestBody, function(response){
            return callback (response);
        })
    })
    
}
function PostListingPhoto(requestFiles, requestBody, callback){
    //need to store data and type of pics in own arrays then call function to store them in database
        var listingId = requestBody.listingId;

        var files = [];
        var fileKeys = Object.keys(requestFiles);

        fileKeys.forEach(function(key) {
            files.push(requestFiles[key]);
        });

        files.forEach(file =>{
            var data =  file.data;
            var type = file.mimetype;

            listingDAL.PostListingPhoto(listingId, data, type, function(err){
                if (err){
                    return callback({
                        "Error" : err
                    })
                }
            })
        })
        return callback({
            "Error" : "",
            "Response" :"Images Saved Successfully"
        })
    }
    function GetListingPhoto(requestBody, callback){
        listingDAL.GetListingPhotos(requestBody.listingId, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        });
    }
    function DeleteListingPhoto(requestBody, callback){
        listingDAL.DeleteListingPhoto(requestBody.photoId, function(err, res){
            if (err){
                return callback({
                    "Error" : err,
                    "Rows Deleted" : ""
                })
            }
            return callback({
                "Error" : "",
                "Rows Deleted" : res.affectedRows
            });
        })
    }
    function GetListingPriceMore(requestBody, callback){
        listingDAL.GetListingPriceMore(requestBody.listingPrice, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        })
    }
    function GetListingPriceLess(requestBody, callback){
        listingDAL.GetListingPriceLess(requestBody.listingPrice, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        })
    }
    function GetListingBedsMore(requestBody, callback){
        listingDAL.GetListingBedsMore(requestBody.beds, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        })
    }
    function GetListingBedsLess(requestBody, callback){
        listingDAL.GetListingBedsLess(requestBody.beds, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        })
    }
    function GetListingBathsMore(requestBody, callback){
        listingDAL.GetListingBathsMore(requestBody.baths, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        })
    }
    function GetListingBathsLess(requestBody, callback){
        listingDAL.GetListingBathsLess(requestBody.baths, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        })
    }
    function GetListingCity(requestBody, callback){
        listingDAL.GetListingCity(requestBody.city, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        })
    }
    function GetListingZipcode(requestBody, callback){
        listingDAL.GetListingZipcode(requestBody.zipcode, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
                })
            }
           
           return callback(rows)
        })
    }
    function GetListingState(requestBody, callback){
        listingDAL.GetListingState(requestBody.state, function(err, rows){
            if (err){
                return callback({
                    "Error" : err,
                    "Response" : ""
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
    GetListingPriceLess
}
