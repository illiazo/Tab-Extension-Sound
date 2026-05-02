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
    console.log('playTabSound called with type:', type);
    
    // Hardcoded sound files
    const soundFile = type === 'new' ? 'sound1.mp3' : 'sound2.mp3';
    const folderPath = type === 'new' ? 'new_tab_sounds' : 'closed_tab_sounds';
    
    const soundPath = `sounds/${folderPath}/${soundFile}`;
    const soundUrl = chrome.runtime.getURL(soundPath);
    
    console.log('Sound URL:', soundUrl);
    
    // Ensure offscreen document exists
    console.log('Ensuring offscreen document exists...');
    await ensureOffscreenDocument();
    
    console.log('Sending message to offscreen document...');
    // Send message to offscreen document to play sound
    chrome.runtime.sendMessage(
      { action: 'playSound', soundData: soundUrl },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('❌ Error sending message:', chrome.runtime.lastError);
        } else if (response && response.success) {
          console.log('✅ Sound played successfully');
        } else if (response && !response.success) {
          console.error('❌ Failed to play sound:', response.error);
        } else {
          console.warn('No response received');
        }
      }
    );
  } catch (error) {
    console.error('Error in playTabSound:', error);
  }
}

// Ensure the offscreen document is created
async function ensureOffscreenDocument() {
  try {
    // Check if offscreen document already exists
    const offscreenUrl = chrome.runtime.getURL('offscreen.html');
    console.log('Checking for existing offscreen document at:', offscreenUrl);
    
    try {
      const existingContexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [offscreenUrl]
      });
      
      if (existingContexts.length > 0) {
        console.log('✅ Offscreen document already exists');
        return;
      }
    } catch (e) {
      console.log('getContexts not available, will attempt to create');
    }
    
    console.log('Creating offscreen document...');
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Playing audio sounds for tab events'
    });
    console.log('✅ Offscreen document created');
  } catch (error) {
    console.log('Note about offscreen document:', error.message);
    // It's okay if it already exists
  }
}

