# Chrome Web Store Publishing Guide

## Prerequisites Checklist

Before you publish, ensure you have:

- [ ] A Google Developer account (create at https://developers.google.com/profile)
- [ ] Paid the $5 one-time registration fee via Google Play Console
- [ ] A valid payment method on file
- [ ] Screenshots for your extension (recommended 1280x800 or 640x400)
- [ ] A promotional tile image (optional but recommended: 440x280 PNG)
- [ ] A 128x128 PNG icon
- [ ] Your extension code in a .zip file
- [ ] Store listing text (see CHROME_STORE_LISTING.md)

## Step 1: Create Developer Account

1. Go to https://developer.chrome.com/docs/webstore/register/
2. Sign in with your Google account
3. Pay the $5 registration fee
4. Accept the Chrome Web Store Developer Agreement

## Step 2: Prepare Your Extension Package

Package your extension into a .zip file:

```bash
# Navigate to your extension folder
cd "/Users/illiazo/Downloads/Tab Sound extension"

# Create a .zip file excluding unnecessary files
zip -r "Tab Sound.zip" \
    background.js \
    manifest.json \
    options.html \
    options.js \
    options.css \
    offscreen.html \
    offscreen.js \
    sounds/ \
    icons/ \
    -x "*.DS_Store" \
    -x "*.git*" \
    -x "*.dmg" \
    -x "*.pdf" \
    -x "CHROME_STORE_LISTING.md" \
    -x "PUBLISH_GUIDE.md" \
    -x "generate_icons.py"
```

## Step 3: Upload to Chrome Web Store

1. Go to https://chrome.google.com/webstore/devconsole
2. Sign in if needed
3. Click "NEW ITEM"
4. Click "Upload" and select your .zip file
5. Wait for initial validation (usually takes a few minutes)

## Step 4: Fill in Store Listing

After upload, you'll be on the "Product Details" page:

### Required Fields:

1. **Display Name**: Tab Sound

2. **Short Description** (132 characters):
   ```
   Play custom sounds when tabs open and close. Customize your browsing with audio notifications.
   ```

3. **Detailed Description**:
   - Copy from CHROME_STORE_LISTING.md under "Detailed Description"

4. **Category**: Select "Productivity"

5. **Content Rating Questionnaire**:
   - Click "Submit Questionnaire" and fill it out
   - Most questions will be "No" for this extension
   - This is required before publishing

6. **Locale**: 
   - Set to English (en) by default
   - You can add other languages later

### Optional but Recommended:

7. **Privacy Policy**:
   ```
   This extension does not collect, share, or store any personal information. 
   All preferences are stored locally on your device using Chrome's storage API.
   ```

8. **Support Email**:
   - Add an email where users can contact you

9. **Homepage URL**:
   - Add if you have a GitHub repository or website

## Step 5: Upload Graphics

1. **Extension Icon** (128x128 PNG):
   - This will be displayed in the Web Store
   - Use a clear, simple design

2. **Screenshots** (recommended):
   - At least 1 required
   - Recommended: 1280x800 or 640x400 PNG/JPG
   - Upload up to 5 screenshots showing features

3. **Tile Image** (optional):
   - 440x280 PNG
   - Promotional image for Web Store

## Step 6: Complete Questionnaire

1. Fill out the **Content Rating Questionnaire**:
   - Go to Content Rating section
   - Answer all questions
   - Most will be "No" for this extension
   - Click "Submit"

2. Wait for IARC rating (automated process)

## Step 7: Review and Submit

1. Go to "Overview" tab
2. Review all information:
   - [ ] Manifest is valid
   - [ ] Display name is set
   - [ ] Description is complete
   - [ ] Category is selected
   - [ ] Content rating is submitted
   - [ ] Graphics are uploaded

3. Click "Submit for Review" at the bottom

## Step 8: Wait for Review

- **Review Time**: Usually 24-48 hours, can take up to a week
- **Notifications**: Check your email for updates
- **If Rejected**: Review the rejection reason and make necessary changes

## Step 9: Publish

Once approved:
1. Return to https://chrome.google.com/webstore/devconsole
2. Find your extension in the list
3. Click on it
4. Click "Publish" button

Your extension is now live on the Chrome Web Store!

## After Publishing

1. Share your extension URL (you'll get a link after publishing)
2. Monitor user reviews and ratings
3. Be responsive to user feedback
4. Update the extension by:
   - Bumping version in manifest.json
   - Uploading new .zip file to the same extension
   - Clicking "Submit for Review"

## Troubleshooting

### "Package Invalid" Error
- Ensure manifest.json is valid JSON
- Check that all required fields are present in manifest
- Verify all referenced files exist

### "Manifest Missing" Error
- Make sure manifest.json is in the root of the .zip
- Not in a subfolder

### "Icon Format Invalid"
- Ensure icon is PNG format
- 128x128 pixels minimum
- No transparency issues

### Extension Takes Long Time to Review
- Check Content Rating section - it may be incomplete
- Review for policy violations
- Contact support if stuck for more than a week

## Alternative: Unlisted Extension

If you don't want public distribution yet:

1. Choose "Unlisted" instead of "Public"
2. This creates a private link you can share
3. Only people with the link can install it
4. No review process needed
5. Can make it public later

## Extension URLs

After publishing:
- **Store URL**: `https://chrome.google.com/webstore/detail/[EXTENSION_ID]`
- **Install URL**: Same as above

## Next Steps

1. Create icons (see Icons section below)
2. Take screenshots of your extension
3. Prepare store listing text
4. Package extension
5. Follow steps 1-9 above

---

## Icons

### Creating Simple Icons

If you don't have graphics software:

1. **Use Canva** (free): https://www.canva.com/
   - Search "chrome extension icon"
   - Create 128x128 design
   - Export as PNG

2. **Use Online Tool**:
   - https://www.favicon-generator.org/
   - Upload a simple image
   - Download as PNG

3. **Use These Designs**:
   - Musical note icon (for Tab Sound)
   - Speaker/volume icon
   - Browser tab with sound waves

### Icon Requirements
- 128x128 PNG minimum (for store)
- 16x16 PNG (extension toolbar - optional)
- 48x48 PNG (settings - optional)
- No transparency at edges
- Clear and recognizable at small sizes

---

## Support

For questions or issues:
1. Chrome Web Store Help: https://support.google.com/chrome_webstore
2. Developer Documentation: https://developer.chrome.com/docs/webstore/
3. Contact Google Support: https://developer.google.com/support

## Important Notes

- ✅ Always test locally first (chrome://extensions with "Developer Mode")
- ✅ Your extension will be scanned for malware automatically
- ✅ Chrome Web Store policies are strict - read them before publishing
- ✅ You can update your extension anytime after publishing
- ✅ One-time $5 fee - no ongoing costs

Good luck with your Tab Sound extension! 🎵
