# 🚀 Renacod Website Deployment Guide

Complete deployment guide for hosting the Renacod website on Hostinger's cloud startup plan.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Database Setup](#database-setup)
6. [Email Service Setup](#email-service-setup)
7. [Domain Configuration](#domain-configuration)
8. [SSL Configuration](#ssl-configuration)
9. [Testing](#testing)
10. [Monitoring & Maintenance](#monitoring--maintenance)
11. [Troubleshooting](#troubleshooting)

## 🎯 Prerequisites

- Hostinger cloud startup plan (or higher)
- Domain name
- MongoDB Atlas account (free tier available)
- Gmail account for email service
- Git knowledge
- Basic command line experience

## 🏗️ Project Overview

The Renacod website consists of:

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + JWT
- **Database**: MongoDB Atlas (cloud)
- **Email**: Nodemailer with Gmail
- **Process Manager**: PM2
- **Hosting**: Hostinger

## 🔧 Backend Setup

### 1. Upload Backend Files

```bash
# On your local machine
cd renacod-20/backend
git add .
git commit -m "Prepare backend for deployment"
git push origin main

# On Hostinger (via SSH or File Manager)
cd /home/username/public_html
git clone https://github.com/yourusername/renacod-20.git
cd renacod-20/backend
```

### 2. Install Dependencies

```bash
# Install Node.js dependencies
npm install --production

# Install PM2 globally
npm install -g pm2
```

### 3. Environment Configuration

```bash
# Copy environment template
cp env.example .env

# Edit .env file with your production values
nano .env
```

**Required .env values:**

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com

# MongoDB Atlas
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/renacod

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yourdomain.com
```

### 4. Start Backend Service

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh

# Or manually start with PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### 5. Verify Backend

```bash
# Check if backend is running
pm2 status

# Test health endpoint
curl http://localhost:5000/api/health

# View logs
pm2 logs renacod-backend
```

## 🎨 Frontend Setup

### 1. Build Frontend

```bash
# On your local machine
cd renacod-20
npm install
npm run build
```

### 2. Upload Frontend

```bash
# Upload the entire 'dist' folder to Hostinger
# Place it in: /home/username/public_html/
```

### 3. Configure Frontend API

Create `.env.production` file:

```env
VITE_API_URL=https://api.yourdomain.com
```

### 4. Update Build

```bash
# Rebuild with production API URL
npm run build

# Upload new dist folder
```

## 🗄️ Database Setup

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster
4. Set up database access (username/password)
5. Set up network access (allow all IPs: 0.0.0.0/0)
6. Get connection string

### 2. Database Connection

```bash
# Test connection from Hostinger
node -e "
const mongoose = require('mongoose');
mongoose.connect('your-mongodb-uri')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection failed:', err));
"
```

### 3. Create Initial Data

```bash
# Create admin user (optional)
node -e "
const User = require('./src/models/User.js');
User.create({
  name: 'Admin User',
  email: 'admin@yourdomain.com',
  password: 'SecurePassword123!',
  role: 'admin'
}).then(user => console.log('Admin user created:', user.email));
"
```

## 📧 Email Service Setup

### 1. Gmail Configuration

1. Enable 2-factor authentication on Gmail
2. Generate App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the App Password in your .env file

### 2. Test Email Service

```bash
# Test email functionality
node -e "
const { testEmailService } = require('./src/utils/emailService.js');
testEmailService().then(success => 
  console.log(success ? 'Email service working' : 'Email service failed')
);
"
```

## 🌐 Domain Configuration

### Option 1: Subdomain Setup (Recommended)

1. **Create API Subdomain**
   - Go to Hostinger control panel
   - Domains → Subdomains
   - Create: `api.yourdomain.com`
   - Point to: `/home/username/public_html/renacod-20/backend`

2. **Configure Backend**
   - Update `.htaccess` in backend folder
   - Ensure proper routing

### Option 2: Subdirectory Setup

1. **Access via subdirectory**
   - Backend: `yourdomain.com/backend`
   - Frontend: `yourdomain.com`

2. **Update CORS settings**
   ```javascript
   // In backend/server.js
   origin: process.env.FRONTEND_URL || 'https://yourdomain.com'
   ```

## 🔒 SSL Configuration

### 1. Enable SSL in Hostinger

1. Go to Hostinger control panel
2. SSL → Manage
3. Enable SSL for your domain
4. Wait for activation (usually 5-10 minutes)

### 2. Force HTTPS

```apache
# In .htaccess files, uncomment:
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 3. Update Environment Variables

```env
FRONTEND_URL=https://yourdomain.com
```

## 🧪 Testing

### 1. Backend Tests

```bash
# Health check
curl https://api.yourdomain.com/api/health

# Contact form test
curl -X POST https://api.yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

### 2. Frontend Tests

1. Visit your website
2. Test contact form
3. Check all pages load correctly
4. Verify API integration

### 3. Email Tests

1. Submit contact form
2. Check if notification email received
3. Verify email formatting

## 📊 Monitoring & Maintenance

### 1. PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs renacod-backend

# Check status
pm2 status
```

### 2. Log Management

```bash
# View application logs
tail -f logs/combined.log

# View error logs
tail -f logs/err.log

# Rotate logs (optional)
pm2 install pm2-logrotate
```

### 3. Performance Monitoring

```bash
# Check memory usage
pm2 show renacod-backend

# Monitor CPU usage
htop

# Check disk space
df -h
```

### 4. Regular Maintenance

```bash
# Update dependencies
npm update

# Restart services
pm2 restart all

# Check for updates
npm outdated
```

## 🔄 Updates & Deployment

### 1. Backend Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install --production

# Restart service
pm2 restart renacod-backend
```

### 2. Frontend Updates

```bash
# On local machine
npm run build

# Upload new dist folder to Hostinger
# Replace existing dist folder
```

### 3. Database Backups

```bash
# Create backup
mongodump --uri="your-mongodb-uri" --out=./backup

# Restore backup (if needed)
mongorestore --uri="your-mongodb-uri" ./backup
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend Not Starting

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs renacod-backend

# Check port availability
netstat -tulpn | grep :5000

# Restart service
pm2 restart renacod-backend
```

#### 2. Database Connection Failed

```bash
# Check MongoDB URI
echo $MONGODB_URI_PROD

# Test connection manually
node -e "require('./src/config/database.js').connectDB()"

# Check network access in MongoDB Atlas
```

#### 3. Email Not Sending

```bash
# Check email configuration
grep EMAIL .env

# Test email service
node -e "require('./src/utils/emailService.js').testEmailService()"

# Verify Gmail App Password
```

#### 4. Frontend API Errors

```bash
# Check API URL
echo $VITE_API_URL

# Verify backend is accessible
curl https://api.yourdomain.com/api/health

# Check CORS configuration
```

#### 5. SSL Issues

```bash
# Check SSL status
curl -I https://yourdomain.com

# Verify .htaccess configuration
cat .htaccess

# Check Hostinger SSL settings
```

### Performance Issues

#### 1. High Memory Usage

```bash
# Check memory usage
pm2 show renacod-backend

# Restart service
pm2 restart renacod-backend

# Check for memory leaks
pm2 logs renacod-backend --lines 100
```

#### 2. Slow Response Times

```bash
# Check database performance
# Monitor MongoDB Atlas metrics

# Check network latency
ping api.yourdomain.com

# Verify CDN configuration
```

## 📚 Additional Resources

### Useful Commands

```bash
# PM2 commands
pm2 list                    # List all processes
pm2 restart all            # Restart all processes
pm2 stop all               # Stop all processes
pm2 delete all             # Delete all processes
pm2 save                   # Save current configuration
pm2 startup                # Setup startup script

# System commands
htop                       # Monitor system resources
df -h                      # Check disk space
free -h                    # Check memory usage
netstat -tulpn            # Check open ports
```

### Configuration Files

- `backend/.env` - Environment variables
- `backend/ecosystem.config.js` - PM2 configuration
- `backend/.htaccess` - Apache configuration
- `frontend/.env.production` - Frontend environment

### Support

- **Hostinger Support**: Available in control panel
- **MongoDB Atlas**: [Documentation](https://docs.atlas.mongodb.com/)
- **PM2 Documentation**: [PM2 Guide](https://pm2.keymetrics.io/docs/)
- **Project Issues**: Create issue in GitHub repository

## 🎉 Success Checklist

- [ ] Backend running on Hostinger
- [ ] Frontend accessible via domain
- [ ] Database connected and working
- [ ] Email service functional
- [ ] SSL certificate active
- [ ] Contact form working
- [ ] All pages loading correctly
- [ ] PM2 monitoring active
- [ ] Logs being generated
- [ ] Health check endpoint responding

---

**🎯 Your Renacod website is now successfully deployed and ready for production use!**

For ongoing support and updates, refer to the project documentation and maintain regular backups of your database and configuration files. 