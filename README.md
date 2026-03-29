# Tab Sound Extension

A Chrome extension that plays custom sounds when tabs are opened and closed.

## Installation

1. **Add your audio files:**
   - Place new tab sounds in `sounds/new_tab_sounds/` folder (e.g., `he_he_boi.mp3`)
   - Place close tab sounds in `sounds/closed_tab_sounds/` folder (e.g., `fah.mp3`)

2. **Load the extension:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked" and select this extension folder

3. **Configure sounds:**
   - Right-click the extension icon and select "Options"
   - Choose which sounds to play for new tabs and closing tabs
   - Click "Play Preview" to test the sounds

## Features

- **Custom sound selection**: Choose different sounds for opening and closing tabs
- **Preview function**: Test sounds before saving
- **Easy configuration**: Simple options page to manage preferences
- **Organized structure**: Separate folders for new tab and close tab sounds

## File Structure

```
Tab Sound extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for tab events
├── options.html          # Settings page HTML
├── options.js            # Settings page script
├── options.css           # Settings page styling
├── README.md             # This file
└── sounds/
    ├── new_tab_sounds/   # Place new tab sound files here
    └── closed_tab_sounds/ # Place close tab sound files here
```

## Supported Audio Formats

- MP3
- WAV
- OGG
- M4A

## Usage

1. Open the extension options to select your preferred sounds
2. The extension will automatically play the selected sound when you:
   - **Open a new tab** - plays sound from `new_tab_sounds/` folder
   - **Close a tab** - plays sound from `closed_tab_sounds/` folder

## Troubleshooting

- **Sounds not playing?** 
  - Check that audio files are in the correct folders
  - Make sure files are in a supported format (MP3, WAV, OGG, M4A)
  - Check browser console for error messages
  - Verify the extension is enabled in `chrome://extensions/`

- **Can't find options?**
  - Right-click the extension icon in the Chrome toolbar
  - Select "Options" from the context menu

## Notes

- Audio files use relative paths from the `sounds/` directory
- The extension uses Chrome's storage API to save your preferences
- Preferences sync across all Chrome profiles if sync is enabled
