const admin = require('firebase-admin')

// Parse the service account from the environment variable.
// The entire JSON is stored as a single-line string in FIREBASE_SERVICE_ACCOUNT_JSON.
let serviceAccount

try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
} catch (err) {
  console.error('❌  Could not parse FIREBASE_SERVICE_ACCOUNT_JSON from .env')
  console.error('    Make sure it is valid JSON on a single line (no line breaks).')
  process.exit(1)
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
}

const db = admin.firestore()
module.exports = { admin, db }