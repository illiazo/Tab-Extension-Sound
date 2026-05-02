// Play sound when a new tab is opened
chrome.tabs.onCreated.addListener((tab) => {
  playTabSound('new');
});

// Play sound when a tab is closed
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  playTabSound('close');
});

// Function to play sound
async function playTabSound(type) {
  try {
    // Hardcoded sound files
    const soundFile = type === 'new' ? 'sound1.mp3' : 'sound2.mp3';
    const folderPath = type === 'new' ? 'new_tab_sounds' : 'closed_tab_sounds';
    
    const soundPath = `sounds/${folderPath}/${soundFile}`;
    const soundUrl = chrome.runtime.getURL(soundPath);
    
    // Ensure offscreen document exists
    await ensureOffscreenDocument();
    
    // Send message to offscreen document to play sound
    chrome.runtime.sendMessage(
      { action: 'playSound', soundData: soundUrl },
      (response) => {
        if (chrome.runtime.lastError) {
          // Silently handle error
        }
      }
    );
  } catch (error) {
    // Silently handle error
  }
}

// Ensure the offscreen document is created
async function ensureOffscreenDocument() {
  try {
    // Check if offscreen document already exists
    const offscreenUrl = chrome.runtime.getURL('offscreen.html');
    
    try {
      const existingContexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [offscreenUrl]
      });
      
      if (existingContexts.length > 0) {
        return;
      }
    } catch (e) {
      // getContexts not available, attempt to create
    }
    
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Playing audio sounds for tab events'
    });
  } catch (error) {
    // It's okay if it already exists
  }
}

