// Load available sounds on page load
document.addEventListener('DOMContentLoaded', loadSounds);

// Save settings when dropdowns change
document.getElementById('newTabSound').addEventListener('change', saveSettings);
document.getElementById('closeTabSound').addEventListener('change', saveSettings);

// Play preview buttons
document.getElementById('playNewTab').addEventListener('click', () => playPreview('new_tab_sounds'));
document.getElementById('playCloseTab').addEventListener('click', () => playPreview('closed_tab_sounds'));

async function loadSounds() {
    try {
        // Fetch available sounds
        const newTabSounds = await fetchSoundsInFolder('new_tab_sounds');
        const closeTabSounds = await fetchSoundsInFolder('closed_tab_sounds');

        // Populate dropdowns
        populateSelect('newTabSound', newTabSounds);
        populateSelect('closeTabSound', closeTabSounds);

        // Load saved preferences
        chrome.storage.sync.get(['newTabSound', 'closeTabSound'], (result) => {
            if (result.newTabSound) {
                document.getElementById('newTabSound').value = result.newTabSound;
            }
            if (result.closeTabSound) {
                document.getElementById('closeTabSound').value = result.closeTabSound;
            }
        });
    } catch (error) {
        console.error('Error loading sounds:', error);
        showStatus('Error loading sounds', 'error');
    }
}

async function fetchSoundsInFolder(folderName) {
    // Since we can't directly list folder contents in Chrome extensions,
    // we'll check for common sound file patterns
    const soundFiles = [];
    const commonFormats = ['mp3', 'wav', 'ogg', 'm4a'];
    
    // For demonstration, return a promise that resolves to an empty array
    // Users will need to manually add their files or we can use a predefined list
    return soundFiles;
}

function populateSelect(selectId, sounds) {
    const select = document.getElementById(selectId);
    
    // Clear existing options (except the first placeholder)
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Add sound files as options
    sounds.forEach(sound => {
        const option = document.createElement('option');
        option.value = sound;
        option.textContent = sound;
        select.appendChild(option);
    });

    // For now, show a message about adding sounds
    if (sounds.length === 0) {
        const option = document.createElement('option');
        option.value = 'he_he_boi.mp3';
        option.textContent = 'he_he_boi.mp3 (example)';
        select.appendChild(option);
    }
}

function saveSettings() {
    const newTabSound = document.getElementById('newTabSound').value;
    const closeTabSound = document.getElementById('closeTabSound').value;

    chrome.storage.sync.set({
        newTabSound: newTabSound,
        closeTabSound: closeTabSound
    }, () => {
        showStatus('Settings saved!', 'success');
    });
}

function playPreview(folderName) {
    const selectId = folderName === 'new_tab_sounds' ? 'newTabSound' : 'closeTabSound';
    const soundFile = document.getElementById(selectId).value;

    if (!soundFile) {
        showStatus('Please select a sound first', 'error');
        return;
    }

    const soundPath = `sounds/${folderName}/${soundFile}`;
    const audio = new Audio(chrome.runtime.getURL(soundPath));
    
    audio.play().catch(error => {
        console.error('Error playing preview:', error);
        showStatus('Error playing sound', 'error');
    });
}

function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    
    setTimeout(() => {
        status.textContent = '';
        status.className = 'status';
    }, 3000);
}
