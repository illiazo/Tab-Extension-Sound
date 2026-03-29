// Play sound when a new tab is opened
chrome.tabs.onCreated.addListener((tab) => {
  chrome.storage.sync.get(['newTabSound'], (result) => {
    if (result.newTabSound) {
      playSound(`new_tab_sounds/${result.newTabSound}`);
    }
  });
});

// Play sound when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.sync.get(['closeTabSound'], (result) => {
    if (result.closeTabSound) {
      playSound(`closed_tab_sounds/${result.closeTabSound}`);
    }
  });
});

// Function to play audio
function playSound(soundPath) {
  const audio = new Audio(chrome.runtime.getURL(`sounds/${soundPath}`));
  audio.play().catch(error => {
    console.error('Error playing sound:', error);
  });
}
