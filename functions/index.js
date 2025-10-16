const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const COLLECTION_PATH = 'artifacts/interactcv/public/data/visitCounters';

exports.incrementVisit = functions.https.onRequest(async (req, res) => {
  // Always set CORS headers
  res.set('Access-Control-Allow-Origin', 'https://viskon.github.io');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    // CORS preflight response
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' });
  }

  try {
    const page = req.body && typeof req.body.page === 'string' ? req.body.page : null;
    if (!page) return res.status(400).send({ error: 'Missing page parameter' });

    const docRef = db.collection(COLLECTION_PATH).doc(page);
    const newCount = await db.runTransaction(async t => {
      const snap = await t.get(docRef);
      if (!snap.exists) {
        t.set(docRef, { count: 1, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
        return 1;
      }
      const current = snap.data().count || 0;
      const updated = current + 1;
      t.update(docRef, { count: updated, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
      return updated;
    });
    res.set('Cache-Control', 'private, no-store, max-age=0');
    return res.status(200).send({ count: newCount });
  } catch (err) {
    console.error('incrementVisit error:', err);
    return res.status(500).send({ error: 'Internal error' });
  }
});