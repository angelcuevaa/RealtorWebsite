const express = require ("express")
const router = express.Router()
const controller = require('../controllers/ListingController')
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname + "/../../client/public/images/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

router.get('/listings', controller.GetAllListings)
router.post('/listings/post', upload.array('file'), controller.PostListing)
router.delete('/listings/deleteListing', controller.DeleteListing)
router.delete('/listings/deleteAddress', controller.DeleteAddress)
router.delete('/listings/deleteAddressAndListing', controller.DeleteAddressAndListing)
router.post('/listings/postPhoto', controller.PostPhoto)
router.get('/listings/getPhotos/:listingId', controller.GetPhoto)
router.delete('/listings/deletePhotos', controller.DeletePhoto)
// router.get('/listings/getListingPriceMore', controller.GetListingPriceMore)
// router.get('/listings/getListingPriceLess', controller.GetListingPriceLess)
// router.get('/listings/getListingBedsMore', controller.GetListingBedsMore)
// router.get('/listings/getListingBedsLess', controller.GetListingBedsLess)
// router.get('/listings/getListingBathsMore', controller.GetListingBathsMore)
// router.get('/listings/getListingBathsLess', controller.GetListingBathsLess)
// router.get('/listings/getListingCity', controller.GetListingCity)
// router.get('/listings/getListingZipcode', controller.GetListingZipcode)
// router.get('/listings/getListingState', controller.GetListingState)
router.get('/our-listing/:id', controller.GetListingById)
router.post('/listings/updateListing/',upload.array('file'), controller.UpdateListing)

// search routes
router.post('/listings/search', controller.SeachListing)

module.exports = router;