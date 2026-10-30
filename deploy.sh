#!/bin/sh
# Builds the site and publishes dist/ to the gh-pages branch (GitHub Pages).
# Usage: npm run deploy
set -e
cd "$(dirname "$0")"
remote=$(git remote get-url origin)
name=$(git config user.name)
email=$(git config user.email)
npm run build
cd dist
touch .nojekyll
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$name" -c user.email="$email" commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git push -q -f "$remote" gh-pages
rm -rf .git
echo "Published. Live in about a minute."
