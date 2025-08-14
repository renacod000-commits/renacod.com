# Renacod Backend API

A robust Node.js/Express backend API for the Renacod website, designed to work seamlessly with Hostinger's cloud startup plan.

## 🚀 Features

- **RESTful API** with comprehensive endpoints
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with role-based access control
- **Input Validation** using express-validator
- **Email Service** using Nodemailer
- **File Upload** support with Multer
- **Rate Limiting** and security middleware
- **Error Handling** with centralized error management
- **Logging** with Morgan
- **Compression** for better performance
- **CORS** configuration for frontend integration

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcryptjs
- **Validation**: express-validator
- **Email**: Nodemailer
- **File Upload**: Multer
- **Process Manager**: PM2 (production)
- **Security**: Helmet, CORS, Rate Limiting

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js # Contact form handling
│   ├── middleware/
│   │   ├── auth.js             # Authentication middleware
│   │   ├── errorHandler.js     # Error handling
│   │   ├── notFound.js         # 404 handling
│   │   └── validation.js       # Input validation
│   ├── models/
│   │   ├── Contact.js          # Contact form model
│   │   ├── Project.js          # Project model
│   │   ├── Service.js          # Service model
│   │   ├── Testimonial.js      # Testimonial model
│   │   └── User.js             # User model
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── contact.js          # Contact routes
│   │   ├── projects.js         # Project routes
│   │   ├── services.js         # Service routes
│   │   └── testimonials.js     # Testimonial routes
│   └── utils/
│       ├── catchAsync.js       # Async error wrapper
│       └── emailService.js     # Email functionality
├── .htaccess                   # Hostinger configuration
├── ecosystem.config.js         # PM2 configuration
├── env.example                 # Environment variables template
├── package.json                # Dependencies
├── README.md                   # This file
└── server.js                   # Main server file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd renacod-20/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/renacod
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/renacod

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@renacod.com

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_SALT_ROUNDS=12
```

### Database Setup

1. **Local MongoDB**
   ```bash
   # Install MongoDB locally or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **MongoDB Atlas (Recommended for production)**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a cluster
   - Get connection string
   - Update `MONGODB_URI_PROD` in `.env`

### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## 🚀 Deployment to Hostinger

### 1. Prepare Your Project

```bash
# Build the project
npm run build

# Test production build
npm start
```

### 2. Upload to Hostinger

1. **Via File Manager**
   - Upload the entire `backend` folder to your Hostinger hosting
   - Place it in the root directory or a subdirectory

2. **Via Git (Recommended)**
   ```bash
   # On Hostinger, clone your repository
   git clone <your-repo-url>
   cd renacod-20/backend
   npm install --production
   ```

### 3. Environment Configuration

1. Create `.env` file on Hostinger with production values
2. Update `MONGODB_URI_PROD` with your MongoDB Atlas connection
3. Set `NODE_ENV=production`

### 4. Start the Application

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### 5. Domain Configuration

1. **Subdomain Setup** (Recommended)
   - Create subdomain: `api.yourdomain.com`
   - Point to your backend directory

2. **Subdirectory Setup**
   - Access via: `yourdomain.com/backend`

### 6. SSL Certificate

1. Enable SSL in Hostinger control panel
2. Update `.htaccess` to force HTTPS (uncomment the last lines)

## 📚 API Endpoints

### Public Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

### Protected Endpoints

- `GET /api/contact` - Get all contacts (Admin/Manager)
- `GET /api/contact/:id` - Get contact by ID
- `PATCH /api/contact/:id` - Update contact
- `DELETE /api/contact/:id` - Delete contact

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Sanitize user input
- **JWT Authentication** - Secure API access
- **Password Hashing** - bcryptjs encryption
- **XSS Protection** - Prevent cross-site scripting
- **SQL Injection Protection** - MongoDB sanitization

## 📊 Performance Optimization

- **Compression** - Gzip compression
- **Database Indexing** - Optimized queries
- **PM2 Clustering** - Multi-core utilization
- **Static File Caching** - Browser caching
- **Rate Limiting** - Prevent server overload

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port 5000
   lsof -i :5000
   # Kill the process
   kill -9 <PID>
   ```

2. **MongoDB Connection Failed**
   - Check MongoDB service status
   - Verify connection string
   - Check firewall settings

3. **Email Not Sending**
   - Verify Gmail credentials
   - Check App Password
   - Enable "Less secure app access" (not recommended)

4. **PM2 Issues**
   ```bash
   # Restart PM2
   pm2 restart all
   
   # Check logs
   pm2 logs
   
   # Reset PM2
   pm2 kill && pm2 start ecosystem.config.js
   ```

### Logs

- **Application Logs**: `./logs/combined.log`
- **Error Logs**: `./logs/err.log`
- **Output Logs**: `./logs/out.log`

## 📈 Monitoring

### PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View real-time logs
pm2 logs --lines 100

# Check status
pm2 status
```

### Health Check

```bash
curl https://yourdomain.com/api/health
```

## 🔄 Updates & Maintenance

### Regular Updates

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Restart application
pm2 restart all
```

### Database Backups

```bash
# MongoDB backup
mongodump --uri="your-mongodb-uri" --out=./backup

# Restore backup
mongorestore --uri="your-mongodb-uri" ./backup
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: renacod000@gmail.com
- Website: [renacod.com](https://renacod.com)

## 🗺️ Roadmap

- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] File upload service
- [ ] Webhook support
- [ ] API documentation (Swagger)
- [ ] Testing suite
- [ ] CI/CD pipeline
- [ ] Docker support
- [ ] Microservices architecture

---

**Built with ❤️ by the Renacod Team** 