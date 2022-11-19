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
//need to do delete and update listings and get specific types of listings based on location, status price, etc.
module.exports = {
    GetAllListings,
    GetListingById,
    UpdateListing,
    PostListing,
    DeleteListing,
    DeleteAddress
}
