const { db } = require('../config/firebase')
const COLLECTION = 'testimonials'

exports.getAllTestimonials = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get()
    const testimonials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.json(testimonials)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching testimonials', error: err.message })
  }
}

exports.createTestimonial = async (req, res) => {
  try {
    const { name, role, company, image, quote, type } = req.body
    const testimonial = {
      name, role: role || '',
      company: company || '',
      image: image || '',
      quote,
      type, // 'speaker' or 'member'
      createdAt: new Date().toISOString()
    }
    const docRef = await db.collection(COLLECTION).add(testimonial)
    res.status(201).json({ id: docRef.id, ...testimonial })
  } catch (err) {
    res.status(500).json({ message: 'Error creating testimonial', error: err.message })
  }
}

exports.updateTestimonial = async (req, res) => {
  try {
    const ref = db.collection(COLLECTION).doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ message: 'Testimonial not found' })
    await ref.update({ ...req.body, updatedAt: new Date().toISOString() })
    res.json({ message: 'Testimonial updated successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error updating testimonial', error: err.message })
  }
}

exports.deleteTestimonial = async (req, res) => {
  try {
    const ref = db.collection(COLLECTION).doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ message: 'Testimonial not found' })
    await ref.delete()
    res.json({ message: 'Testimonial deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting testimonial', error: err.message })
  }
}