# 🚀 Renacod Website

A modern, responsive website with a robust backend API, built with React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB. Perfect for hosting on Hostinger's cloud startup plan.

## ✨ Features

- **🎨 Modern Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **🔧 Robust Backend**: Node.js + Express + MongoDB + JWT Authentication
- **📱 Responsive Design**: Mobile-first approach with beautiful UI components
- **📧 Contact System**: Integrated contact form with email notifications
- **🔒 Security**: JWT authentication, input validation, rate limiting
- **📊 Database**: MongoDB with Mongoose ODM
- **📧 Email Service**: Nodemailer integration with Gmail
- **🚀 Performance**: Optimized for production with PM2 process management
- **🌐 Hosting Ready**: Configured for Hostinger cloud hosting

## 🏗️ Project Structure

```
renacod-20/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── ...
├── backend/               # Backend API
│   ├── src/
│   │   ├── controllers/   # API controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Utility functions
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── public/                # Static assets
├── package.json           # Frontend dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (free tier available)
- Gmail account for email service

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd renacod-20

# Make quick start script executable
chmod +x quick-start.sh

# Run the quick start script
./quick-start.sh
```

### 2. Manual Setup (Alternative)

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Copy environment files
cp backend/env.example backend/.env
```

### 3. Configure Environment

Edit `backend/.env` with your settings:

```env
# Database
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/renacod

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# JWT
JWT_SECRET=your-super-secret-key
```

### 4. Start Development Servers

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
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

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend:**
```bash
cd backend
npm run dev          # Start development server
npm start            # Start production server
npm run build        # Build backend
npm test             # Run tests
```

### API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check
- `GET /api/projects` - Get projects
- `GET /api/services` - Get services
- `GET /api/testimonials` - Get testimonials

### Database Models

- **Contact**: Contact form submissions
- **Project**: Portfolio projects
- **Service**: Offered services
- **Testimonial**: Client testimonials
- **User**: Admin users

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI_PROD=mongodb+srv://...
JWT_SECRET=your-secret
EMAIL_USER=your-email
EMAIL_PASS=your-password
```

### MongoDB Setup

1. Create [MongoDB Atlas](https://www.mongodb.com/atlas) account
2. Create cluster
3. Set up database access
4. Configure network access
5. Get connection string

### Email Setup

1. Enable 2FA on Gmail
2. Generate App Password
3. Use App Password in backend .env

## 📱 Features

### Frontend Components

- **Navigation**: Responsive navigation with mobile menu
- **Hero Section**: Eye-catching hero with call-to-action
- **Services**: Service showcase with icons and descriptions
- **Projects**: Portfolio gallery with filtering
- **Contact Form**: Integrated contact form with validation
- **Footer**: Company information and social links

### Backend Features

- **RESTful API**: Clean, documented API endpoints
- **Authentication**: JWT-based user authentication
- **Validation**: Input validation and sanitization
- **Email Service**: Automated email notifications
- **Database**: MongoDB with Mongoose ODM
- **Security**: Rate limiting, CORS, Helmet.js
- **Logging**: Comprehensive logging system
- **Process Management**: PM2 for production

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Controlled cross-origin access
- **Security Headers**: Helmet.js security middleware
- **Password Hashing**: bcryptjs encryption
- **XSS Protection**: Cross-site scripting prevention

## 📊 Performance

- **Compression**: Gzip compression for responses
- **Caching**: Browser caching for static assets
- **Database Indexing**: Optimized MongoDB queries
- **PM2 Clustering**: Multi-core process utilization
- **CDN Ready**: Configured for content delivery networks

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check MongoDB connection
   - Verify environment variables
   - Check port availability

2. **Contact form not working**
   - Verify backend is running
   - Check email configuration
   - Review browser console errors

3. **Database connection failed**
   - Verify MongoDB Atlas settings
   - Check network access configuration
   - Verify connection string

### Getting Help

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Review backend logs: `pm2 logs renacod-backend`
- Check frontend console for errors
- Verify environment configuration

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

- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] File upload service
- [ ] Webhook support
- [ ] API documentation (Swagger)
- [ ] Testing suite
- [ ] CI/CD pipeline
- [ ] Docker support

---

**Built with ❤️ by the Renacod Team**

For deployment assistance, refer to [DEPLOYMENT.md](./DEPLOYMENT.md).
