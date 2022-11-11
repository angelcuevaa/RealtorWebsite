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
//need to do delete and update listings and get specific types of listings based on location, status price, etc.
module.exports = {
    GetAllListings,
    PostListing,
    DeleteListing,
     DeleteAddress
}
