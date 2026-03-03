const { db } = require('../config/firebase')

const COLLECTION = 'events'

// GET all events
exports.getAllEvents = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get()
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message })
  }
}

// GET single event
exports.getEventById = async (req, res) => {
  try {
    const doc = await db.collection(COLLECTION).doc(req.params.id).get()
    if (!doc.exists) return res.status(404).json({ message: 'Event not found' })
    res.json({ id: doc.id, ...doc.data() })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err.message })
  }
}

// POST create event (protected)
exports.createEvent = async (req, res) => {
  try {
    const {
      title, description, date, status,
      coverImage, speaker, tags
    } = req.body

    const newEvent = {
      title,
      description,
      date,
      status, // 'upcoming' or 'completed'
      coverImage: coverImage || '',
      speaker: speaker || '',
      tags: tags || [],
      createdAt: new Date().toISOString()
    }

    const docRef = await db.collection(COLLECTION).add(newEvent)
    res.status(201).json({ id: docRef.id, ...newEvent })
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err.message })
  }
}

// PUT update event (protected)
exports.updateEvent = async (req, res) => {
  try {
    const eventRef = db.collection(COLLECTION).doc(req.params.id)
    const doc = await eventRef.get()
    if (!doc.exists) return res.status(404).json({ message: 'Event not found' })

    await eventRef.update({ ...req.body, updatedAt: new Date().toISOString() })
    res.json({ message: 'Event updated successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message })
  }
}

// DELETE event (protected)
exports.deleteEvent = async (req, res) => {
  try {
    const eventRef = db.collection(COLLECTION).doc(req.params.id)
    const doc = await eventRef.get()
    if (!doc.exists) return res.status(404).json({ message: 'Event not found' })

    await eventRef.delete()
    res.json({ message: 'Event deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message })
  }
}