#!/bin/bash

# Ensure script stops on first error
set -e

echo "🚀 Starting release process..."

# 1. Run checks
echo "📦 Running build and tests..."
pnpm run build
# pnpm run test # Un-comment when tests are added

# 2. Generate changelog & bump version
echo "📝 Bumping version and generating changelog..."
pnpm run release

# 3. Push to git
echo "📤 Pushing tags and commits..."
git push --follow-tags origin main

echo "✅ Release complete!"
