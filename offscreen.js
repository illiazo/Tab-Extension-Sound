const audioPlayer = document.getElementById('audioPlayer');

console.log('Offscreen document loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Offscreen received message:', request);
    
    if (request.action === 'playSound') {
        console.log('Playing sound from URL:', request.soundData);
        
        audioPlayer.src = request.soundData;
        audioPlayer.volume = 1.0;
        
        audioPlayer.play()
            .then(() => {
                console.log('Sound played successfully');
                sendResponse({ success: true });
            })
            .catch((error) => {
                console.error('Error playing sound:', error);
                sendResponse({ success: false, error: error.message });
            });
        
        return true; // Keep the message channel open for sendResponse
    }
});

// Also handle direct audio playing
audioPlayer.addEventListener('error', (e) => {
    console.error('Audio player error:', e);
});

audioPlayer.addEventListener('ended', () => {
    console.log('Audio playback ended');
});
