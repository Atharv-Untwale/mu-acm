const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventsController')

// Public routes
router.get('/', getAllEvents)
router.get('/:id', getEventById)

// Protected routes (admin only)
router.post('/', auth, createEvent)
router.put('/:id', auth, updateEvent)
router.delete('/:id', auth, deleteEvent)

module.exports = router