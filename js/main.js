// 1. SERVICE WORKER REGISTRATION
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker: Registered successfully', reg))
            .catch(err => console.error('Service Worker: Registration failed', err));
    });
}

// 2. NETWORK STATUS MONITORING (Useful for Syllabus Testing Outcomes)
const statusDisplay = document.getElementById('network-status');

function updateOnlineStatus() {
    if (navigator.onLine) {
        statusDisplay.textContent = "🟢 Online";
        statusDisplay.style.color = "#4ade80";
    } else {
        statusDisplay.textContent = "🔴 Offline Mode Active";
        statusDisplay.style.color = "#f87171";
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus(); // Initial run

// 3. STUDENT DATA MANAGEMENT WORKSPACE
// Hint: Use LocalStorage to save and load your booking arrays!
console.log('App initialization complete. Ready for theme logic development.');
