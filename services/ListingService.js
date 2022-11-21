const listingDAL = require('../dal/ListingsDAL');
const ListingController = require('../controllers/ListingController')

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
function PostListing(requestBody, callback){
    var address = {
        "street" : requestBody.street,
        "city" : requestBody.city,
        "state" : requestBody.state,
        "zipcode" : requestBody.zipcode
    };
    //need to check if address exists before posting it
    listingDAL.CheckAddressExist(address.street, function(err, res){
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
   
    //might need ti stick all of this in the above method call to avoid sending 2 responses error
    listingDAL.GetAddressId(address, function(err, res){
        if (err){
            return callback({
                "Error" : err,
                "Response" : ""
            })
        }

        //add error check, if addressId isnt returned then send an error out

        // store listing now since we have the addressID
        var listing = {
            "listingName" : requestBody.listingName,
            "listingPrice" : requestBody.listingPrice,
            "listingDescription" : requestBody.listingDescription,
            "beds" : requestBody.beds,
            "baths" : requestBody.baths,
            "status" : requestBody.status,
            "addressId" : res[0]["address_id"],
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

    listingDAL.DeleteListing(requestBody.listingId, function(err, response){
    
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
//need to do update listings and get specific types of listings based on location, status price, etc.
//for update listings, need to send elements that werent changed with the ones that were changed
//also need to be able to post, delete, get, and update with pictures/videos
module.exports = {
    GetAllListings,
    PostListing,
    DeleteListing,
    DeleteAddress,
    DeleteAddressAndListing
}
