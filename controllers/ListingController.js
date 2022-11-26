const ListingService = require ('../services/ListingService')
const {Blob}  = require("buffer");

module.exports = {
    GetAllListings : (req, res) => {
        ListingService.GetAllListings(function(err, rows){
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        })
    },
    PostListing : (req, res) => {
        //change return to be a json object instead of random strings
        if (Object.keys(req.body).length === 0){
            res.send({"Error" : "No arguments sent"});
        }
        else{
            ListingService.PostListing(req.body, function(response){
                return res.send(response);
            })
        }
        
    },
    DeleteListing : (req, res) => {
        if (Object.keys(req.body).length === 0){
            res.send({"Error" : "No arguments sent"});
        }
        ListingService.DeleteListing(req.body, function(response){
            return res.send(response);
        })
    },
    DeleteAddress : (req, res) => {
        if (Object.keys(req.body).length === 0){
            res.send({"Error" : "No arguments sent"});
        }
        ListingService.DeleteAddress(req.body, function(response){
            return res.send(response);
        })
    },
    DeleteAddressAndListing : (req, res) => {
        if (Object.keys(req.body).length === 0){
            res.send({"Error" : "No arguments sent"});
        }
        ListingService.DeleteAddressAndListing(req.body, function(response){
            return res.send(response);
        })

    },
    PostPhoto : (req, res) => {
        //need to either convert the data in backend or frontend back to pdf
        //need to send listingId as well, can access through req.body
        if (!req.files){
            return res.send({"Error" : "No arguments sent"});
        }

        ListingService.PostListingPhoto(req.files, req.body, function(response){
            return res.send(response);
        })
        
        //const blob = new Blob([buf]);
        //console.log(blob.stream().getReader())
        //res.send(blob);
        
        
    },
    GetPhoto : (req, res) => {
        ListingService.GetListingPhoto(req.body, function(err, rows){
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        })
    },
    DeletePhoto : (req, res) => {
        if (Object.keys(req.body).length === 0){
            res.send({"Error" : "No arguments sent"});
        }
        ListingService.DeleteListingPhoto(req.body, function(response){
            return res.send(response);
        })
    }
    //delete listing and address
}