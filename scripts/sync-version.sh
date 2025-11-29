#!/bin/bash

# PiggyTales Version Sync Script
# Syncs version across all configuration files

set -e

VERSION=${1:-"1.0.0"}

echo "🐷🍄 Syncing PiggyTales version to $VERSION..."

# Files to update
FILES=(
    ".claude-plugin/marketplace.json"
    "piggytales/.claude-plugin/plugin.json"
    "piggytales/CHANGELOG.md"
    "install.sh"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  Updating $file..."
        # Use appropriate sed command based on file type
        if [[ "$file" == *.json ]]; then
            sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" "$file"
        elif [[ "$file" == *.sh ]]; then
            sed -i '' "s/VERSION=\"[^\"]*\"/VERSION=\"$VERSION\"/" "$file"
        fi
    fi
done

echo "🍄✨ Version sync complete!"
