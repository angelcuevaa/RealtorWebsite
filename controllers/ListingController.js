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
    PostListing : (req, res) => {
        if (Object.keys(req.body).length === 0){
            res.send("no arguments passed");
        }
        else{
            ListingService.PostListing(req.body, function(err, response){
                if (err){
                    return res.send(err);
                }
                return res.send(response);
            })
        }
        
    }
}