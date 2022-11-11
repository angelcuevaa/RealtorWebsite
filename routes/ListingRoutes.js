const express = require ("express")
const router = express.Router()
const controller = require('../controllers/ListingController')

router.get('/listings', controller.GetAllListings)
router.post('/listings/post', controller.PostListing)

module.exports = router;