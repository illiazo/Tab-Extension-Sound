const audioPlayer = document.getElementById('audioPlayer');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'playSound') {
        audioPlayer.src = request.soundData;
        audioPlayer.volume = 1.0;
        
        audioPlayer.play()
            .then(() => {
                sendResponse({ success: true });
            })
            .catch((error) => {
                sendResponse({ success: false, error: error.message });
            });
        
        return true; // Keep the message channel open for sendResponse
    }
});

// Handle audio errors silently
audioPlayer.addEventListener('error', () => {
    // Silently handle playback errors
});
