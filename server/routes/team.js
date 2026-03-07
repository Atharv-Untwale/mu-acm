const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { getAllTeam, createTeamMember, updateTeamMember, deleteTeamMember } = require('../controllers/teamController')

router.get('/', getAllTeam)
router.post('/', auth, createTeamMember)
router.put('/:id', auth, updateTeamMember)
router.delete('/:id', auth, deleteTeamMember)

module.exports = router