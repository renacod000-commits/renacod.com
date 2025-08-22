@echo off
chcp 65001 >nul

echo 🚀 Renacod Website Deployment Script
echo =====================================

REM Build the project
echo 📦 Building the project...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo 🌐 Choose your deployment platform:
echo 1. GitHub Pages (Free)
echo 2. Netlify (Free)
echo 3. Vercel (Free)
echo 4. Firebase Hosting (Free)
echo 5. Surge.sh (Free)
echo 6. Manual deployment
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
    echo 📚 GitHub Pages Deployment
    echo Push your code to GitHub and enable GitHub Pages in repository settings.
    echo The GitHub Actions workflow will automatically deploy your site.
) else if "%choice%"=="2" (
    echo 🌐 Netlify Deployment
    echo 1. Go to netlify.com
    echo 2. Sign up/Login with GitHub
    echo 3. Click 'New site from Git'
    echo 4. Select your repository
    echo 5. Build settings are already configured
    echo 6. Click 'Deploy site'
) else if "%choice%"=="3" (
    echo ⚡ Vercel Deployment
    echo 1. Go to vercel.com
    echo 2. Sign up/Login with GitHub
    echo 3. Click 'New Project'
    echo 4. Import your repository
    echo 5. Build settings are already configured
    echo 6. Click 'Deploy'
) else if "%choice%"=="4" (
    echo 🔥 Firebase Hosting Deployment
    echo Installing Firebase CLI...
    call npm install -g firebase-tools
    echo Please run the following commands:
    echo firebase login
    echo firebase init hosting
    echo firebase deploy
) else if "%choice%"=="5" (
    echo 📈 Surge.sh Deployment
    echo Installing Surge...
    call npm install -g surge
    echo Deploying to Surge...
    call surge dist
) else if "%choice%"=="6" (
    echo 📁 Manual Deployment
    echo Your built files are in the 'dist/' directory.
    echo Upload these files to any web server that supports static hosting.
) else (
    echo ❌ Invalid choice!
    pause
    exit /b 1
)

echo.
echo 🎉 Deployment instructions completed!
echo Check DEPLOYMENT_GUIDE.md for detailed instructions.
pause
