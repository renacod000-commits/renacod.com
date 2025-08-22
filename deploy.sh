#!/bin/bash

# Renacod Website Deployment Script
# This script helps deploy the static website to various platforms

echo "🚀 Renacod Website Deployment Script"
echo "====================================="

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🌐 Choose your deployment platform:"
echo "1. GitHub Pages (Free)"
echo "2. Netlify (Free)"
echo "3. Vercel (Free)"
echo "4. Firebase Hosting (Free)"
echo "5. Surge.sh (Free)"
echo "6. Manual deployment"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo "📚 GitHub Pages Deployment"
        echo "Push your code to GitHub and enable GitHub Pages in repository settings."
        echo "The GitHub Actions workflow will automatically deploy your site."
        ;;
    2)
        echo "🌐 Netlify Deployment"
        echo "1. Go to netlify.com"
        echo "2. Sign up/Login with GitHub"
        echo "3. Click 'New site from Git'"
        echo "4. Select your repository"
        echo "5. Build settings are already configured"
        echo "6. Click 'Deploy site'"
        ;;
    3)
        echo "⚡ Vercel Deployment"
        echo "1. Go to vercel.com"
        echo "2. Sign up/Login with GitHub"
        echo "3. Click 'New Project'"
        echo "4. Import your repository"
        echo "5. Build settings are already configured"
        echo "6. Click 'Deploy'"
        ;;
    4)
        echo "🔥 Firebase Hosting Deployment"
        echo "Installing Firebase CLI..."
        npm install -g firebase-tools
        echo "Please run the following commands:"
        echo "firebase login"
        echo "firebase init hosting"
        echo "firebase deploy"
        ;;
    5)
        echo "📈 Surge.sh Deployment"
        echo "Installing Surge..."
        npm install -g surge
        echo "Deploying to Surge..."
        surge dist
        ;;
    6)
        echo "📁 Manual Deployment"
        echo "Your built files are in the 'dist/' directory."
        echo "Upload these files to any web server that supports static hosting."
        ;;
    *)
        echo "❌ Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment instructions completed!"
echo "Check DEPLOYMENT_GUIDE.md for detailed instructions."
