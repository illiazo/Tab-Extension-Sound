#!/bin/bash

# Tab Sound Extension Packaging Script
# This script creates a production-ready .zip file for Chrome Web Store

EXTENSION_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_NAME="Tab_Sound_Extension.zip"
OUTPUT_PATH="$EXTENSION_DIR/$OUTPUT_NAME"

echo "📦 Packaging Tab Sound Extension for Chrome Web Store..."
echo "Extension directory: $EXTENSION_DIR"
echo ""

# Remove old zip if it exists
if [ -f "$OUTPUT_PATH" ]; then
    rm "$OUTPUT_PATH"
    echo "✅ Removed old package"
fi

# Create the zip file with only necessary files
cd "$EXTENSION_DIR"

zip -r "$OUTPUT_NAME" \
    background.js \
    manifest.json \
    offscreen.html \
    offscreen.js \
    options.html \
    options.js \
    options.css \
    sounds/ \
    icons/ \
    -x "*.DS_Store" \
    ".git/*" \
    ".gitignore" \
    "*.dmg" \
    "*.pdf" \
    "CHROME_STORE_LISTING.md" \
    "PUBLISH_GUIDE.md" \
    "package.sh" \
    "node_modules/*" \
    ".env" \
    "*.md" \
    2>/dev/null

echo ""
echo "✅ Package created successfully!"
echo ""
echo "📝 Package Details:"
echo "   Location: $OUTPUT_PATH"
echo "   Size: $(ls -lh "$OUTPUT_PATH" | awk '{print $5}')"
echo ""
echo "📋 Contents:"
unzip -l "$OUTPUT_PATH" | head -20
echo ""
echo "🚀 Next Steps:"
echo "   1. Go to https://chrome.google.com/webstore/devconsole"
echo "   2. Click 'NEW ITEM'"
echo "   3. Upload this .zip file: $OUTPUT_NAME"
echo "   4. Follow the prompts to fill in store listing"
echo ""
echo "📖 For detailed instructions, see: PUBLISH_GUIDE.md"
echo ""
