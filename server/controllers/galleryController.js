const { db } = require('../config/firebase')
const COLLECTION = 'gallery'

exports.getAllPhotos = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get()
    const photos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.json(photos)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gallery', error: err.message })
  }
}

exports.addPhoto = async (req, res) => {
  try {
    const { url, caption, event, category } = req.body
    const photo = {
      url, caption: caption || '',
      event: event || '',
      category: category || 'general',
      createdAt: new Date().toISOString()
    }
    const docRef = await db.collection(COLLECTION).add(photo)
    res.status(201).json({ id: docRef.id, ...photo })
  } catch (err) {
    res.status(500).json({ message: 'Error adding photo', error: err.message })
  }
}

exports.deletePhoto = async (req, res) => {
  try {
    const ref = db.collection(COLLECTION).doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ message: 'Photo not found' })
    await ref.delete()
    res.json({ message: 'Photo deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting photo', error: err.message })
  }
}