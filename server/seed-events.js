require('dotenv').config()
const admin = require('firebase-admin')
const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const EVENTS = [
  { id: 'code_canvas', title: 'Code Canvas', date: 'March 2026', status: 'Ongoing', coverImage: '/Events/Code Canvas.png', description: 'The founding event of MU-ACM — a celebration of community, technology, and the beginning of something extraordinary at Medi-Caps University.', tags: ['Web Development'] },
  { id: 'vertex', title: 'Getting Started With Vertex AI', date: 'February 2026', status: 'completed', coverImage: '/Events/Vertex AI.png', description: 'The founding event of MU-ACM — a celebration of community, technology, and the beginning of something extraordinary at Medi-Caps University.', speaker: 'Mr. Abhishek Raj Permani', tags: ['AI', 'Agentic AI'] },
  { id: 'chakkravyuh_2.0', title: 'Chakravyuh 2.0: The Escape Room', date: 'February 2026', status: 'completed', coverImage: '/Events/Poster (7).png', description: 'The founding event of MU-ACM — a celebration of community, technology, and the beginning of something extraordinary at Medi-Caps University.', tags: ['Game'] },
  { id: 'genesis', title: 'Genesis: A Web3 Awakening', date: 'Jul 2024', status: 'completed', coverImage: '/events/genesis.webp', description: 'The founding event of MU-ACM — a celebration of community, technology, and the beginning of something extraordinary at Medi-Caps University.', speaker: 'Mr. Anurag Bajpai & Mr. Jasneet Singh Saini', tags: ['Community', 'Web3'] },
  { id: 'basics-of-javascript', title: 'Basics of Javascript', date: 'Feb 2025', status: 'completed', coverImage: '/events/basics-of-js.webp', description: 'A free online workshop introducing participants to the fundamentals and practical applications of JavaScript.', speaker: 'Mr. Swayam Prajapat — Full Stack Developer', tags: ['Workshop', 'Web Dev'] },
  { id: 'fundamentals-of-video-editing', title: 'Fundamentals of Video Editing', date: 'Jan 2025', status: 'completed', coverImage: '/events/editing.webp', description: 'A hands-on workshop covering the core principles of video editing — storytelling through cuts, color grading, transitions, and industry-standard tools.', speaker: 'Mr. Ram Krishna Swarnkar', tags: ['Workshop', 'Design'] },
  { id: 'digital-marketing', title: 'Leveraging AI in Digital Marketing', date: 'Dec 2024', status: 'completed', coverImage: '/events/dm.webp', description: 'Expert sessions exploring the intersection of AI and digital marketing — AI-driven strategies, personalised campaigns, data-driven decisions and customer engagement.', speaker: 'Mr. Kaustubh Joshi', tags: ['Workshop', 'AI'] },
  { id: 'conquering-canva', title: 'Conquering Canva', date: 'Nov 2024', status: 'completed', coverImage: '/events/canva.webp', description: 'A creative workshop teaching students to design professional graphics, posters, and social media content using Canva.', speaker: 'Ms. Aditi Pathak', tags: ['Workshop', 'Design'] },
  { id: 'technical-tambola', title: 'Technical Tambola', date: 'Oct 2024', status: 'completed', coverImage: '/events/tambola.webp', description: 'A unique twist on the classic Tambola — tech trivia edition. Test your knowledge of computing concepts in a fun, high-energy competitive format.', tags: ['Competition', 'Fun'] },
  { id: 'ainovate', title: 'AINovate', date: 'Sep 2024', status: 'completed', coverImage: '/events/ainovate.webp', description: 'An innovation-focused event exploring the frontiers of Artificial Intelligence — from generative AI models to real-world industry applications and future trends.', speaker: 'Mr. Lokesh Sukhwal', tags: ['AI', 'Innovation'] },
  { id: 'fastn-roadshow', title: 'Fastn Roadshow', date: 'Aug 2024', status: 'completed', coverImage: '/events/fastn.webp', description: 'A roadshow in collaboration with Fastn, introducing students to the next generation of web development tools, low-code platforms, and modern workflows.', tags: ['Web Dev', 'Industry'] },
]

async function seed() {
  console.log('🗑️  Clearing existing events...')
  const existing = await db.collection('events').get()
  const batch = db.batch()
  existing.docs.forEach(doc => batch.delete(doc.ref))
  await batch.commit()
  console.log(`   Deleted ${existing.size} docs.\n🌱 Seeding ${EVENTS.length} events...\n`)

  for (const { id, ...data } of EVENTS) {
    const clean = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))
    try {
      await db.collection('events').doc(id).set(clean)
      console.log(`  ✅ ${data.title}`)
    } catch (err) {
      console.log(`  ❌ ${data.title} — ${err.message}`)
    }
  }
  console.log(`\n✨ Done! ${EVENTS.length} events seeded.`)
  process.exit(0)
}
seed()