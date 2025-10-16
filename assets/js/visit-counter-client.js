// Client: call server-side function to increment visit counters.
// Replace direct Firestore client logic in your HTML pages with this script.
// Set FUNCTION_URL to the deployed Cloud Function HTTPS endpoint.
(function () {
  const FUNCTION_URL = "REPLACE_WITH_YOUR_FUNCTION_URL"; // <-- update after deploying functions

  function getPageName() {
    return window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  }

  async function incrementVisit() {
    const visitCountElement = document.getElementById('visit-count');
    if (!visitCountElement) return;

    try {
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // If you add authentication (App Check or custom header), add it here
        },
        body: JSON.stringify({ page: getPageName() })
      });

      if (!res.ok) {
        console.error('Visit increment HTTP error', res.status);
        visitCountElement.textContent = '?';
        return;
      }

      const data = await res.json();
      if (data && typeof data.count === 'number') {
        visitCountElement.textContent = data.count;
      } else {
        visitCountElement.textContent = '?';
      }
    } catch (err) {
      console.error('Error calling incrementVisit function:', err);
      const visitCountElement = document.getElementById('visit-count');
      if (visitCountElement) visitCountElement.textContent = '?';
    }
  }

  // Run after DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    incrementVisit();
  });
})();