const { db } = require('../config/firebase')
const COLLECTION = 'faculty'

exports.getAllFaculty = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get()
    const faculty = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.json(faculty)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching faculty', error: err.message })
  }
}

exports.createFaculty = async (req, res) => {
  try {
    const { name, designation, department, image, statement } = req.body
    const member = {
      name, designation: designation || '',
      department: department || '',
      image: image || '',
      statement,
      createdAt: new Date().toISOString()
    }
    const docRef = await db.collection(COLLECTION).add(member)
    res.status(201).json({ id: docRef.id, ...member })
  } catch (err) {
    res.status(500).json({ message: 'Error creating faculty', error: err.message })
  }
}

exports.updateFaculty = async (req, res) => {
  try {
    const ref = db.collection(COLLECTION).doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ message: 'Faculty not found' })
    await ref.update({ ...req.body, updatedAt: new Date().toISOString() })
    res.json({ message: 'Faculty updated successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error updating faculty', error: err.message })
  }
}

exports.deleteFaculty = async (req, res) => {
  try {
    const ref = db.collection(COLLECTION).doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ message: 'Faculty not found' })
    await ref.delete()
    res.json({ message: 'Faculty deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting faculty', error: err.message })
  }
}