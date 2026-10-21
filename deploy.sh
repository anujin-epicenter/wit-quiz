#!/bin/bash
# ==============================================================================
# One-Click Deployment Script for Wit Quiz
# ==============================================================================

echo "🚀 Checking for Git..."

if ! git --version >/dev/null 2>&1; then
    echo "⚠️  Apple developer tools are still installing on your Mac."
    echo "Please wait for the installer popup to complete, then re-run this script!"
    exit 1
fi

echo "✓ Git is ready! Initializing repository..."

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# Set remote origin
git remote remove origin 2>/dev/null
git remote add origin https://github.com/anujin-epicenter/wit-quiz.git

# Stage all project files (ignoring >100MB playbook via .gitignore)
git add index.html README.md .gitignore css/ js/ assets/

# Commit
git commit -m "Epicenter Women in Tech Quiz: Static release with timer & fireworks"

echo "📡 Pushing to GitHub (https://github.com/anujin-epicenter/wit-quiz.git)..."
git push -u origin main

echo ""
echo "🎉 SUCCESS! Your quiz code is now on GitHub!"
echo "👉 Next step: Go to https://github.com/anujin-epicenter/wit-quiz/settings/pages"
echo "   Select 'main' branch and click Save."
echo "   Your live site will be ready at: https://anujin-epicenter.github.io/wit-quiz/"
