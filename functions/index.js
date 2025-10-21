const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * A modern, secure "Callable" function to increment a view count.
 * This is called directly from the view.html page.
 */
exports.incrementVisitCount = functions.https.onCall(async (data, context) => {
  // Ensure the user is calling the function with the required 'shareId'
  const shareId = data.shareId;
  if (!shareId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a 'shareId' argument."
    );
  }

  // Define the path to the counter document in Firestore
  const counterRef = db.collection("publicShares").doc(shareId);

  try {
    // Use a transaction to safely update the count
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(counterRef);
      
      // Get the current count, or initialize it to 0 if it doesn't exist
      const currentCount = doc.data()?.visitCount || 0;
      const newCount = currentCount + 1;

      // Update the visitCount field. Using .update will create the field if it doesn't exist on the document.
      transaction.update(counterRef, { visitCount: newCount });
    });

    console.log(`Successfully incremented visit count for ${shareId}`);
    return { success: true };

  } catch (error) {
    console.error("Transaction failed: ", error);
    // Throw a specific error back to the client
    throw new functions.https.HttpsError(
      "internal",
      "Failed to update visit count."
    );
  }
});
