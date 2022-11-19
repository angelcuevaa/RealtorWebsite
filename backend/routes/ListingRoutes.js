const express = require ("express")
const router = express.Router()
const controller = require('../controllers/ListingController')
const multer = require('multer')
const path = require('path')

const upload = multer({ dest: './public/data/uploads/' })

router.get('/listings', controller.GetAllListings)
router.get('/our-listing/:id', controller.GetListingById)
router.post('/listings/post', upload.single('listing_image'), controller.PostListing)
router.delete('/listings/deleteListing', controller.DeleteListing)
router.delete('/listings/deleteAddress', controller.DeleteAddress)
// update listing and address by id
router.put('/listings/updateListing', controller.UpdateListing)

router.post("/image", upload.single('image'), (req, res) => {
    console.log(req.file)
    res.send("image")
})
module.exports = router;