const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Hardcoded admin credentials (we'll store in Firebase later)
const ADMIN_EMAIL = 'admin@muacm.com'
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('muacm@admin2024', 10)

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    if (email !== ADMIN_EMAIL) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}