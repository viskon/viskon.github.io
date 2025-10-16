const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const COLLECTION_PATH = 'artifacts/interactcv/public/data/visitCounters';

// Basic rate-limiting (in-memory for demo)
const lastCalls = {};
const MIN_INTERVAL_MS = 1000;

exports.incrementVisit = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://viskon.github.io');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });

  try {
    const ip = req.headers['x-forwarded-for'] || req.ip || 'unknown';
    const now = Date.now();
    const last = lastCalls[ip] || 0;
    if (now - last < MIN_INTERVAL_MS) return res.status(429).send({ error: 'Too many requests' });
    lastCalls[ip] = now;

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
    res.status(200).send({ count: newCount });
  } catch (err) {
    console.error('incrementVisit error:', err);
    res.status(500).send({ error: 'Internal error' });
  }
});