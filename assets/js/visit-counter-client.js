(function () {
  const FUNCTION_URL = "https://us-central1-interactcv-7b41f.cloudfunctions.net/incrementVisit"; 

  function getPageName() {
    return window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  }

  async function incrementVisit() {
    const visitCountElement = document.getElementById('visit-count');
    if (!visitCountElement) return;

    try {
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: getPageName() })
      });

      if (!res.ok) {
        console.error('Visit increment HTTP error', res.status);
        visitCountElement.textContent = '?';
        return;
      }

      const data = await res.json();
      visitCountElement.textContent = typeof data.count === 'number' ? data.count : '?';
    } catch (err) {
      console.error('Error calling incrementVisit function:', err);
      visitCountElement.textContent = '?';
    }
  }

  document.addEventListener('DOMContentLoaded', incrementVisit);
})();