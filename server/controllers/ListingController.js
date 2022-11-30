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

    GetListingById : (req, res) => {
        ListingService.GetListingById(req.params, function(err, rows){
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        })
    },

    UpdateListing : (req, res) => {
        // console.log(req.body);
        // res.send("update listing")
        ListingService.UpdateListing(req.body, function(err, rows){
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
        console.log(req.body)
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
    },
    GetListingPriceMore : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingPriceMore(req.body, function(response){
            return res.send(response);
        })
    },
    GetListingPriceLess : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingPriceLess(req.body, function(response){
            return res.send(response);
        })
    },
    GetListingBedsMore : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingBedsMore(req.body, function(response){
            return res.send(response);
        })
    },
    GetListingBedsLess : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingBedsLess(req.body, function(response){
            return res.send(response);
        })
    },
    GetListingBathsMore : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingBathsMore(req.body, function(response){
            return res.send(response);
        })
    },
    GetListingBathsLess : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingBathsLess(req.body, function(response){
            return res.send(response);
        })
    },
    GetListingCity : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingCity(req.body, function(response){
            return res.send(response);
        })
    },
    GetListingZipcode : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingZipcode(req.body, function(response){
            return res.send(response);
        })
    },
    GetListingState : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.GetListingState(req.body, function(response){
            return res.send(response);
        })
    }
}