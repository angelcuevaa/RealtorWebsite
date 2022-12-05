const ListingService = require ('../services/ListingService')
const { search } = require('../routes/ListingRoutes');
fs = require('fs')

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

        ListingService.UpdateListing(req.body, req.files, function(err, rows){
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        })
    },

    PostListing : (req, res) => {

        if (Object.keys(req.body).length === 0){
            res.send({"Error" : "No arguments sent"});
        }
        else{
            ListingService.PostListing(req.body, req.files, function(response){
                return res.send(response);
            })
        }
        
        // var image = req.files.image
        // const image_name = image.name.split('.')[0] + '-' + Date.now() + '.' + image.name.split('.')[1]
        // const image_path = __dirname + "/../../client/public/images/" + image_name

        // image = image.data
        // image = image.toString('base64')

        // image = new Buffer.from(image, 'base64')
        
        // fs.writeFile(image_path, image, function(err){
        //     if (err){
        //         console.log(err)
        //     }
        //     else{
        //         console.log("Image saved")
        //     }
        // })
        
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

        ListingService.PostListingPhoto(req.body, function(response){
            return res.send(response);
        })
        
    },
    GetPhoto : (req, res) => {
        ListingService.GetListingPhoto(req.params, function(err, rows){
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
    },

    SeachListing : (req, res) => {
        if (Object.keys(req.body).length === 0){
            return res.send({"Error" : "No arguments sent"});
        }
        ListingService.SearchListing(req.body, function(response){
            return res.send(response);
        })
    },
}