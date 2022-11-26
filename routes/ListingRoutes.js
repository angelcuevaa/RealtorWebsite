const express = require ("express")
const router = express.Router()
const controller = require('../controllers/ListingController')

router.get('/listings', controller.GetAllListings)
router.post('/listings/post', controller.PostListing)
router.delete('/listings/deleteListing', controller.DeleteListing)
router.delete('/listings/deleteAddress', controller.DeleteAddress)
router.delete('/listings/deleteAddressAndListing', controller.DeleteAddressAndListing)
router.post('/listings/postPhoto', controller.PostPhoto)
router.get('/listings/getPhotos', controller.GetPhoto)
router.delete('/listings/deletePhotos', controller.DeletePhoto)

module.exports = router;