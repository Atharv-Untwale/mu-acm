const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialsController')

router.get('/', getAllTestimonials)
router.post('/', auth, createTestimonial)
router.put('/:id', auth, updateTestimonial)
router.delete('/:id', auth, deleteTestimonial)

module.exports = router