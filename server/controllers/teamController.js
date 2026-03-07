const { db } = require('../config/firebase')
const COLLECTION = 'team'

exports.getAllTeam = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('order', 'asc').get()
    const team = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.json(team)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching team', error: err.message })
  }
}

exports.createTeamMember = async (req, res) => {
  try {
    const { name, role, image, category, order, linkedin, github } = req.body
    const member = {
      name, role,
      image: image || '',
      category, // 'core', 'mentor'
      order: order || 0,
      linkedin: linkedin || '',
      github: github || '',
      createdAt: new Date().toISOString()
    }
    const docRef = await db.collection(COLLECTION).add(member)
    res.status(201).json({ id: docRef.id, ...member })
  } catch (err) {
    res.status(500).json({ message: 'Error creating member', error: err.message })
  }
}

exports.updateTeamMember = async (req, res) => {
  try {
    const ref = db.collection(COLLECTION).doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ message: 'Member not found' })
    await ref.update({ ...req.body, updatedAt: new Date().toISOString() })
    res.json({ message: 'Member updated successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error updating member', error: err.message })
  }
}

exports.deleteTeamMember = async (req, res) => {
  try {
    const ref = db.collection(COLLECTION).doc(req.params.id)
    const doc = await ref.get()
    if (!doc.exists) return res.status(404).json({ message: 'Member not found' })
    await ref.delete()
    res.json({ message: 'Member deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting member', error: err.message })
  }
}