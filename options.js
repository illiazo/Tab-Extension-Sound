// Load available sounds on page load
document.addEventListener('DOMContentLoaded', loadSounds);

// Save settings when dropdowns change
document.getElementById('newTabSound').addEventListener('change', saveSettings);
document.getElementById('closeTabSound').addEventListener('change', saveSettings);

// Play preview buttons
document.getElementById('playNewTab').addEventListener('click', () => playPreview('newTabSound'));
document.getElementById('playCloseTab').addEventListener('click', () => playPreview('closeTabSound'));

async function loadSounds() {
    try {
        // Hardcoded sounds
        const newTabSounds = ['sound1.mp3'];
        const closeTabSounds = ['sound2.mp3'];

        populateSelect('newTabSound', newTabSounds);
        populateSelect('closeTabSound', closeTabSounds);

        // Load saved preferences
        chrome.storage.sync.get(['newTabSound', 'closeTabSound'], (result) => {
            if (result.newTabSound) {
                document.getElementById('newTabSound').value = result.newTabSound;
            } else {
                document.getElementById('newTabSound').value = 'sound1.mp3';
            }
            
            if (result.closeTabSound) {
                document.getElementById('closeTabSound').value = result.closeTabSound;
            } else {
                document.getElementById('closeTabSound').value = 'sound2.mp3';
            }
        });
    } catch (error) {
        console.error('Error loading sounds:', error);
        showStatus('Error loading sounds', 'error');
    }
}

async function fetchSoundsInFolder(folderName) {
    // Common sound files to check for
    const commonSounds = [
        'he_he_boi.mp3',
        'fah.mp3',
        'sound1.mp3',
        'sound2.mp3',
        'sound3.mp3',
        'beep.mp3',
        'bell.mp3',
        'chime.mp3'
    ];
    
    // Try to fetch each sound file to see what exists
    const foundSounds = [];
    
    for (const sound of commonSounds) {
        try {
            const response = await fetch(chrome.runtime.getURL(`sounds/${folderName}/${sound}`));
            if (response.ok) {
                foundSounds.push(sound);
            }
        } catch (e) {
            // Sound file doesn't exist, continue
        }
    }
    
    return foundSounds;
}

function populateSelect(selectId, sounds) {
    const select = document.getElementById(selectId);
    
    // Clear existing options (except the first placeholder)
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Add sound files as options
    sounds.forEach(sound => {
        if (sound) { // Skip empty strings
            const option = document.createElement('option');
            option.value = sound;
            option.textContent = sound;
            select.appendChild(option);
        }
    });
}

function saveSettings() {
    const newTabSound = document.getElementById('newTabSound').value || 'sound1.mp3';
    const closeTabSound = document.getElementById('closeTabSound').value || 'sound2.mp3';

    chrome.storage.sync.set({
        newTabSound: newTabSound,
        closeTabSound: closeTabSound
    }, () => {
        showStatus('Settings saved!', 'success');
        console.log('Settings saved:', { newTabSound, closeTabSound });
    });
}

function playPreview(selectId) {
    const soundFile = document.getElementById(selectId).value;

    if (!soundFile) {
        showStatus('Please select a sound first', 'error');
        return;
    }

    const folderPrefix = selectId === 'newTabSound' ? 'new_tab_sounds' : 'closed_tab_sounds';
    const soundPath = `sounds/${folderPrefix}/${soundFile}`;
    const soundUrl = chrome.runtime.getURL(soundPath);
    
    console.log('Playing preview:', soundUrl);
    
    // Use offscreen document to play sound (same as background.js)
    chrome.runtime.sendMessage(
        { action: 'playSound', soundData: soundUrl },
        (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
                showStatus('Error playing sound', 'error');
            } else if (response && response.success) {
                console.log('Preview played successfully');
                showStatus('Playing preview...', 'success');
            } else if (response && !response.success) {
                console.error('Failed to play preview:', response.error);
                showStatus('Error playing sound', 'error');
            }
        }
    );
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
