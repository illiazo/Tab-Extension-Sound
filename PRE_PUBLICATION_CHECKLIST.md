# Pre-Publication Checklist

Complete this checklist before publishing to the Chrome Web Store.

## Code Quality

- [ ] **Console Logs Removed**: No debug console.logs in production code
  - background.js ✅ Cleaned
  - options.js - Still has some, verify needed
  - offscreen.js - Check for debug statements

- [ ] **Error Handling**: Proper try-catch blocks in place
  - playTabSound() function ✅
  - ensureOffscreenDocument() ✅
  - offscreen message listener ✅

- [ ] **No Hardcoded Values**: 
  - ⚠️ Sound files are hardcoded (sound1.mp3, sound2.mp3)
  - NOTE: This is by design - update manifest version if you change sound file logic

- [ ] **Manifest Valid**:
  - manifest_version: 3 ✅
  - name, version, description present ✅
  - All required permissions listed ✅
  - All files referenced exist ✅

## Documentation

- [ ] **README.md Updated**: ✅ Comprehensive usage guide
- [ ] **CHROME_STORE_LISTING.md Created**: ✅ Store listing content
- [ ] **PUBLISH_GUIDE.md Created**: ✅ Step-by-step publishing guide
- [ ] **Privacy Policy Documented**: ✅ In CHROME_STORE_LISTING.md

## Assets

- [ ] **Icons Created**: 
  - [ ] 128x128 PNG (required for store)
  - [ ] 16x16 PNG (toolbar - optional but recommended)
  - [ ] 48x48 PNG (settings - optional)
  - Location: icons/ directory

- [ ] **Screenshots Prepared**: (You need to create these)
  - [ ] At least 1 screenshot (recommended 1280x800 or 640x400)
  - [ ] Screenshot showing options page
  - [ ] Screenshot showing settings

- [ ] **Promotional Image** (optional):
  - [ ] 440x280 PNG for Web Store tile

## Google Account Setup

- [ ] **Developer Account Created**: 
  - Go to https://developers.google.com/profile

- [ ] **Registration Fee Paid**: 
  - $5 one-time payment
  - Submit via Google Play Console

- [ ] **Developer Agreement Accepted**:
  - Read and accept Chrome Web Store Developer Agreement

## Pre-Packaging Verification

- [ ] **Extension Loads Locally**:
  - [ ] Navigate to chrome://extensions
  - [ ] Enable "Developer mode"
  - [ ] Load unpacked extension
  - [ ] Test all features work
  - [ ] No errors in console

- [ ] **Sounds Work**:
  - [ ] Verify sounds exist in correct directories
  - [ ] Test "Play Preview" buttons in options
  - [ ] Test new tab and close tab sounds

- [ ] **Permissions Make Sense**:
  - tabs: Required for tab events ✅
  - storage: Required for preferences ✅
  - offscreen: Required for audio playback ✅

## Before Publishing

- [ ] **Package Created**:
  - Run: `bash package.sh`
  - Verify Tab_Sound_Extension.zip created

- [ ] **Test Package Contents**:
  - Verify manifest.json is in root
  - Verify all required files included
  - No extra files (.DS_Store, .git, etc.)

- [ ] **Version Updated** (if needed):
  - Current version: 1.0.0
  - Bump to 1.0.1 or higher for updates

- [ ] **Store Listing Text Ready**:
  - [ ] Display Name: "Tab Sound"
  - [ ] Short Description: Ready (see CHROME_STORE_LISTING.md)
  - [ ] Detailed Description: Ready
  - [ ] Category: "Productivity" selected
  - [ ] Privacy Policy: Ready

- [ ] **Content Rating Questionnaire**:
  - [ ] Know you'll need to answer this
  - [ ] Most answers will be "No"
  - [ ] Understand it's required before publication

## During Publishing

- [ ] **Upload to Web Store**:
  - [ ] Go to https://chrome.google.com/webstore/devconsole
  - [ ] Click "NEW ITEM"
  - [ ] Upload Tab_Sound_Extension.zip
  - [ ] Wait for validation

- [ ] **Fill Store Listing**:
  - [ ] All required fields completed
  - [ ] Graphics uploaded (icon + screenshots)
  - [ ] Store text matches CHROME_STORE_LISTING.md

- [ ] **Complete Content Rating**:
  - [ ] Submit questionnaire
  - [ ] Wait for IARC rating (auto-generated)

## After Publishing

- [ ] **Monitor Review Process**:
  - [ ] Check email for approval/rejection
  - [ ] Typical review time: 24-48 hours

- [ ] **Publish After Approval**:
  - [ ] Return to extension dashboard
  - [ ] Click "Publish" button
  - [ ] Extension goes live!

- [ ] **Test Live Version**:
  - [ ] Search for "Tab Sound" in Chrome Web Store
  - [ ] Verify it appears
  - [ ] Test installation from store link
  - [ ] Verify functionality works

- [ ] **Share and Promote** (optional):
  - [ ] Share extension URL
  - [ ] Ask for reviews/ratings
  - [ ] Monitor user feedback

## Important Reminders

✅ **Double-check all file paths in manifest.json**
✅ **Test the extension locally before packaging**
✅ **Ensure no malicious code or trackers**
✅ **Privacy policy must match what extension actually does**
✅ **Screenshots should show actual extension UI**
✅ **Icons must be PNG format**
✅ **Pay the $5 registration fee before submitting**

## Troubleshooting

If you get rejected:
1. Read the rejection reason carefully
2. Make necessary changes
3. Update manifest version number
4. Package again
5. Resubmit

If stuck:
- Check: https://support.google.com/chrome_webstore
- Developer docs: https://developer.chrome.com/docs/webstore/

---

## Ready to Publish?

1. ✅ Complete all items in this checklist
2. ✅ Run `bash package.sh` to create package
3. ✅ Follow PUBLISH_GUIDE.md steps
4. ✅ Submit to Chrome Web Store

Good luck! 🚀
