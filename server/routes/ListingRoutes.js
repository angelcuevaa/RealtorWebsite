const express = require ("express")
const router = express.Router()
const controller = require('../controllers/ListingController')
const path = require('path')

router.get('/listings', controller.GetAllListings)
router.get('/our-listing/:id', controller.GetListingById)
router.post('/listings/post', controller.PostListing)
router.delete('/listings/deleteListing', controller.DeleteListing)
router.delete('/listings/deleteAddress', controller.DeleteAddress)
// update listing and address by id
router.put('/listings/updateListing', controller.UpdateListing)

module.exports = router;