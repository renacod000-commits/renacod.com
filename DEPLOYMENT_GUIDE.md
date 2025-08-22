# Deployment Guide for Renacod Static Website

This guide provides instructions for deploying the Renacod website to various hosting platforms.

## 🚀 Quick Deploy Options

### 1. GitHub Pages (Free)
The website is already configured for GitHub Pages deployment.

**Steps:**
1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select "GitHub Actions" as the source
5. The workflow will automatically deploy on every push to main branch

**URL:** `https://[your-username].github.io/[repository-name]`

### 2. Netlify (Free Tier Available)
**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Select your repository
5. Build settings are already configured in `netlify.toml`
6. Click "Deploy site"

**Features:**
- Automatic deployments on Git push
- Custom domain support
- SSL certificates
- CDN

### 3. Vercel (Free Tier Available)
**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Build settings are already configured in `vercel.json`
6. Click "Deploy"

**Features:**
- Automatic deployments
- Edge functions support
- Custom domains
- Analytics

### 4. Firebase Hosting (Free Tier Available)
**Steps:**
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Select your project
5. Set public directory to `dist`
6. Configure as SPA
7. Deploy: `firebase deploy`

### 5. Surge.sh (Free)
**Steps:**
1. Install Surge: `npm install -g surge`
2. Build the project: `npm run build`
3. Deploy: `surge dist`
4. Follow the prompts

## 🔧 Manual Deployment

### Build the Project
```bash
npm install
npm run build
```

The built files will be in the `dist/` directory.

### Upload to Any Web Server
You can upload the contents of the `dist/` folder to any web server that supports static hosting.

## 🌐 Custom Domain Setup

### For GitHub Pages:
1. Add a CNAME file in the `public/` directory with your domain
2. Configure DNS records to point to GitHub Pages
3. Enable custom domain in repository settings

### For Netlify/Vercel:
1. Add custom domain in the platform dashboard
2. Configure DNS records as instructed
3. SSL will be automatically provisioned

## 📝 Environment Variables

No environment variables are needed for the static website since we removed the backend.

## 🔍 Testing Before Deployment

```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```

## 📊 Performance Optimization

The website is already optimized with:
- Vite build optimization
- Image compression
- CSS/JS minification
- Tree shaking
- Code splitting

## 🛠️ Troubleshooting

### Build Issues
- Ensure Node.js version 18+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

### Deployment Issues
- Verify the `dist/` folder contains the built files
- Check platform-specific logs
- Ensure all static assets are included

## 📞 Support

For deployment issues, refer to the platform-specific documentation:
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://docs.netlify.com/)
- [Vercel](https://vercel.com/docs)
- [Firebase](https://firebase.google.com/docs/hosting)
- [Surge](https://surge.sh/help/)

## 🎯 Recommended Hosting

**For Production:** Netlify or Vercel (best performance and features)
**For Development:** GitHub Pages (free and simple)
**For Enterprise:** Firebase Hosting (Google's infrastructure)
