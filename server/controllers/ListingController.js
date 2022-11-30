const ListingService = require ('../services/ListingService')

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
    }
}