const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Helper function to generate incremental indexes
async function getNextIndex(collection) {
  const snapshot = await db.collection(collection)
    .orderBy('index', 'desc')
    .limit(1)
    .get();
  
  if (snapshot.empty) {
    return 1; // Start with 1 if no documents exist
  }
  
  return snapshot.docs[0].data().index + 1;
}

module.exports = {
  db,
  getNextIndex
};