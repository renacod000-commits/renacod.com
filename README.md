# 🚀 Renacod Website

A modern, responsive static website built with React, TypeScript, Tailwind CSS, and Vite. Features a Google Form integration for contact management and is ready for deployment on any static hosting platform.

## ✨ Features

- **🎨 Modern Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **📱 Responsive Design**: Mobile-first approach with beautiful UI components
- **📧 Contact System**: Integrated Google Form for seamless contact management
- **🚀 Performance**: Optimized for production with Vite build system
- **🌐 Static Hosting Ready**: Configured for GitHub Pages, Netlify, Vercel, and more
- **🎯 SEO Optimized**: Meta tags and structured data for better search visibility
- **📊 Analytics Ready**: Easy integration with Google Analytics and other tracking tools

## 🏗️ Project Structure

```
renacod-20/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── ...
├── public/                # Static assets
├── dist/                  # Built files (generated)
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── netlify.toml          # Netlify deployment config
├── vercel.json           # Vercel deployment config
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd renacod-20

# Install dependencies
npm install
```

### 2. Start Development Server

```bash
# Start the development server
npm run dev
```

The website will be available at `http://localhost:8080`

### 3. Build for Production

```bash
# Build the project
npm run build
```

The built files will be in the `dist/` directory.
cd backend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api/health

## 🚀 Production Deployment

### Hostinger Deployment

1. **Backend Setup**
   ```bash
   cd backend
   chmod +x deploy.sh
   ./deploy.sh
   ```

2. **Frontend Build**
   ```bash
   npm run build
   # Upload dist/ folder to Hostinger
   ```

3. **Domain Configuration**
   - Create subdomain: `api.yourdomain.com` → backend
   - Main domain: `yourdomain.com` → frontend

### Detailed Deployment Guide

## 🚀 Deployment

The website is configured for deployment on multiple platforms. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Quick Deploy Options

1. **GitHub Pages** (Free) - Already configured with GitHub Actions
2. **Netlify** (Free) - Configured with `netlify.toml`
3. **Vercel** (Free) - Configured with `vercel.json`
4. **Firebase Hosting** (Free) - Manual setup required
5. **Surge.sh** (Free) - Manual setup required

### Automated Deployment

Run the deployment script:
```bash
# Windows
deploy.bat

# Linux/Mac
./deploy.sh
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Environment Variables

No environment variables are required for the static website. The Google Form integration handles all contact form submissions.

### Google Form Integration

The contact page uses your Google Form for handling inquiries. The form URL is:
```
https://docs.google.com/forms/d/e/1FAIpQLScuGXtE3tBB0qxpySVlvZjlcabpxxoYvfJcd-f7twEr6KNH7w/viewform?usp=dialog
```

To update the form URL, edit `src/pages/Contact.tsx`.

## 📱 Features

### Frontend Components

- **Navigation**: Responsive navigation with mobile menu
- **Hero Section**: Eye-catching hero with call-to-action
- **Services**: Service showcase with icons and descriptions
- **Projects**: Portfolio gallery with filtering
- **Contact Form**: Google Form integration for seamless contact management
- **Footer**: Company information and social links

### Key Features

- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Performance Optimized**: Vite build system with code splitting
- **SEO Ready**: Meta tags and structured data
- **Accessibility**: WCAG compliant components
- **Cross-browser Compatible**: Works on all modern browsers
## 📊 Performance

- **Build Optimization**: Vite with tree shaking and code splitting
- **Asset Optimization**: Compressed images and minified CSS/JS
- **Caching**: Browser caching for static assets
- **CDN Ready**: Configured for content delivery networks

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run lint`

2. **Google Form not working**
   - Verify the form URL is correct in `src/pages/Contact.tsx`
   - Check if the form is publicly accessible
   - Test the form URL directly in browser

3. **Deployment issues**
   - Verify the `dist/` folder contains built files
   - Check platform-specific logs
   - Ensure all static assets are included

### Getting Help

- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions
- Review build logs for errors
- Check browser console for frontend errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Email**: renacod000@gmail.com
- **Website**: [renacod.com](https://renacod.com)
- **Issues**: Create an issue in the repository

## 🗺️ Roadmap

- [ ] Blog section
- [ ] Portfolio gallery
- [ ] Client testimonials
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Performance monitoring
- [ ] A/B testing
- [ ] Multi-language support

---

**Built with ❤️ by the Renacod Team**

For deployment assistance, refer to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).
