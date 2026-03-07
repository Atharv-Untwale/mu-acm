const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { getAllPhotos, addPhoto, deletePhoto } = require('../controllers/galleryController')

router.get('/', getAllPhotos)
router.post('/', auth, addPhoto)
router.delete('/:id', auth, deletePhoto)

module.exports = router