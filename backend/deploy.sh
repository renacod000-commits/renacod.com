#!/bin/bash

# Renacod Backend Deployment Script for Hostinger
# This script automates the deployment process

set -e

echo "🚀 Starting Renacod Backend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="renacod-backend"
PM2_CONFIG="ecosystem.config.js"
NODE_VERSION="18"

# Check if Node.js is installed and has correct version
check_node() {
    echo -e "${BLUE}📋 Checking Node.js version...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed. Please install Node.js ${NODE_VERSION}+${NC}"
        exit 1
    fi
    
    NODE_CURRENT=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_CURRENT" -lt "$NODE_VERSION" ]; then
        echo -e "${RED}❌ Node.js version ${NODE_CURRENT} is too old. Please upgrade to ${NODE_VERSION}+${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Node.js version $(node -v) is compatible${NC}"
}

# Check if PM2 is installed
check_pm2() {
    echo -e "${BLUE}📋 Checking PM2 installation...${NC}"
    
    if ! command -v pm2 &> /dev/null; then
        echo -e "${YELLOW}⚠️  PM2 is not installed. Installing PM2...${NC}"
        npm install -g pm2
    fi
    
    echo -e "${GREEN}✅ PM2 is available${NC}"
}

# Install dependencies
install_deps() {
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    
    if [ -f "package-lock.json" ]; then
        npm ci --production
    else
        npm install --production
    fi
    
    echo -e "${GREEN}✅ Dependencies installed${NC}"
}

# Create necessary directories
create_dirs() {
    echo -e "${BLUE}📁 Creating necessary directories...${NC}"
    
    mkdir -p logs
    mkdir -p uploads
    mkdir -p backups
    
    echo -e "${GREEN}✅ Directories created${NC}"
}

# Check environment file
check_env() {
    echo -e "${BLUE}🔧 Checking environment configuration...${NC}"
    
    if [ ! -f ".env" ]; then
        echo -e "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
        if [ -f "env.example" ]; then
            cp env.example .env
            echo -e "${YELLOW}⚠️  Please edit .env file with your production values${NC}"
            echo -e "${YELLOW}⚠️  Press Enter when ready to continue...${NC}"
            read
        else
            echo -e "${RED}❌ env.example not found. Please create .env file manually${NC}"
            exit 1
        fi
    fi
    
    echo -e "${GREEN}✅ Environment file ready${NC}"
}

# Stop existing PM2 processes
stop_pm2() {
    echo -e "${BLUE}🛑 Stopping existing PM2 processes...${NC}"
    
    if pm2 list | grep -q "$APP_NAME"; then
        pm2 stop "$APP_NAME"
        pm2 delete "$APP_NAME"
        echo -e "${GREEN}✅ Existing processes stopped${NC}"
    else
        echo -e "${YELLOW}ℹ️  No existing processes found${NC}"
    fi
}

# Start application with PM2
start_pm2() {
    echo -e "${BLUE}🚀 Starting application with PM2...${NC}"
    
    pm2 start "$PM2_CONFIG" --env production
    
    # Save PM2 configuration
    pm2 save
    
    echo -e "${GREEN}✅ Application started with PM2${NC}"
}

# Setup PM2 startup script
setup_pm2_startup() {
    echo -e "${BLUE}⚙️  Setting up PM2 startup script...${NC}"
    
    pm2 startup
    
    echo -e "${GREEN}✅ PM2 startup script configured${NC}"
    echo -e "${YELLOW}⚠️  Please run the command shown above as root/sudo${NC}"
}

# Health check
health_check() {
    echo -e "${BLUE}🏥 Performing health check...${NC}"
    
    # Wait a moment for the app to start
    sleep 5
    
    if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Application is healthy${NC}"
    else
        echo -e "${RED}❌ Health check failed${NC}"
        echo -e "${YELLOW}⚠️  Check PM2 logs: pm2 logs $APP_NAME${NC}"
        exit 1
    fi
}

# Show status
show_status() {
    echo -e "${BLUE}📊 Application Status:${NC}"
    pm2 status
    
    echo -e "\n${BLUE}📋 Useful Commands:${NC}"
    echo -e "  View logs: ${GREEN}pm2 logs $APP_NAME${NC}"
    echo -e "  Monitor: ${GREEN}pm2 monit${NC}"
    echo -e "  Restart: ${GREEN}pm2 restart $APP_NAME${NC}"
    echo -e "  Stop: ${GREEN}pm2 stop $APP_NAME${NC}"
}

# Main deployment function
main() {
    echo -e "${BLUE}🎯 Starting deployment process...${NC}"
    
    check_node
    check_pm2
    create_dirs
    check_env
    install_deps
    stop_pm2
    start_pm2
    setup_pm2_startup
    health_check
    show_status
    
    echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}🌐 Your application should now be running on port 5000${NC}"
    echo -e "${YELLOW}⚠️  Remember to:${NC}"
    echo -e "  1. Configure your domain/subdomain"
    echo -e "  2. Enable SSL certificate"
    echo -e "  3. Set up MongoDB Atlas connection"
    echo -e "  4. Configure email service"
}

# Run main function
main "$@" 