#!/bin/bash

# Renacod Website Quick Start Script
# This script sets up both frontend and backend for development

set -e

echo "🚀 Starting Renacod Website Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
check_node() {
    echo -e "${BLUE}📋 Checking Node.js...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
        echo -e "${YELLOW}Visit: https://nodejs.org/${NC}"
        exit 1
    fi
    
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"
}

# Check if npm is installed
check_npm() {
    echo -e "${BLUE}📋 Checking npm...${NC}"
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
        exit 1
    fi
    
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm ${NPM_VERSION} found${NC}"
}

# Setup frontend
setup_frontend() {
    echo -e "${BLUE}🎨 Setting up frontend...${NC}"
    
    cd frontend || cd .
    
    if [ ! -f "package.json" ]; then
        echo -e "${YELLOW}⚠️  Frontend package.json not found. Setting up from root...${NC}"
        cd ..
    fi
    
    echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
    npm install
    
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
}

# Setup backend
setup_backend() {
    echo -e "${BLUE}🔧 Setting up backend...${NC}"
    
    if [ -d "backend" ]; then
        cd backend
        
        echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
        npm install
        
        echo -e "${BLUE}🔧 Setting up environment...${NC}"
        if [ ! -f ".env" ] && [ -f "env.example" ]; then
            cp env.example .env
            echo -e "${YELLOW}⚠️  Backend .env file created from template${NC}"
            echo -e "${YELLOW}⚠️  Please edit .env with your configuration${NC}"
        fi
        
        echo -e "${GREEN}✅ Backend setup complete${NC}"
        cd ..
    else
        echo -e "${YELLOW}⚠️  Backend directory not found${NC}"
    fi
}

# Create environment files
create_env_files() {
    echo -e "${BLUE}🔧 Creating environment files...${NC}"
    
    # Frontend .env
    if [ ! -f ".env.local" ]; then
        cat > .env.local << EOF
# Frontend Environment Variables
VITE_API_URL=http://localhost:5000/api
EOF
        echo -e "${GREEN}✅ Frontend .env.local created${NC}"
    fi
    
    # Backend .env
    if [ -d "backend" ] && [ ! -f "backend/.env" ] && [ -f "backend/env.example" ]; then
        cp backend/env.example backend/.env
        echo -e "${GREEN}✅ Backend .env created from template${NC}"
        echo -e "${YELLOW}⚠️  Please edit backend/.env with your configuration${NC}"
    fi
}

# Show next steps
show_next_steps() {
    echo -e "\n${GREEN}🎉 Setup completed successfully!${NC}"
    echo -e "\n${BLUE}📋 Next Steps:${NC}"
    echo -e "1. ${YELLOW}Configure backend environment:${NC}"
    echo -e "   - Edit backend/.env with your MongoDB and email settings"
    echo -e "   - Set up MongoDB Atlas account"
    echo -e "   - Configure Gmail App Password"
    
    echo -e "\n2. ${YELLOW}Start development servers:${NC}"
    echo -e "   ${GREEN}Frontend:${NC} npm run dev"
    echo -e "   ${GREEN}Backend:${NC} cd backend && npm run dev"
    
    echo -e "\n3. ${YELLOW}Test the application:${NC}"
    echo -e "   - Frontend: http://localhost:3000"
    echo -e "   - Backend: http://localhost:5000/api/health"
    
    echo -e "\n4. ${YELLOW}For production deployment:${NC}"
    echo -e "   - Read DEPLOYMENT.md for detailed instructions"
    echo -e "   - Use backend/deploy.sh for backend deployment"
    
    echo -e "\n${BLUE}📚 Documentation:${NC}"
    echo -e "   - DEPLOYMENT.md - Complete deployment guide"
    echo -e "   - backend/README.md - Backend documentation"
    echo -e "   - README.md - Project overview"
}

# Main setup function
main() {
    echo -e "${BLUE}🎯 Starting Renacod website setup...${NC}"
    
    check_node
    check_npm
    setup_frontend
    setup_backend
    create_env_files
    show_next_steps
    
    echo -e "\n${GREEN}🎉 Setup completed! Happy coding! 🚀${NC}"
}

# Run main function
main "$@" 