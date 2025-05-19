#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Job Post Generator - Development Script${NC}"
echo "----------------------------------------"

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if npm is installed
if ! command_exists npm; then
  echo -e "${RED}Error: npm is not installed${NC}"
  exit 1
fi

# Start development server
run_dev() {
  echo -e "${GREEN}Starting development server...${NC}"
  cd frontend || cd frontend-backup
  npm run dev
}

# Run tests
run_tests() {
  echo -e "${GREEN}Running tests...${NC}"
  cd frontend || cd frontend-backup
  npm test
}

# Build for production
build_prod() {
  echo -e "${GREEN}Building for production...${NC}"
  cd frontend || cd frontend-backup
  npm run build
  echo -e "${GREEN}Build complete. Files are in dist/ directory${NC}"
}

# Preview production build
preview_prod() {
  echo -e "${GREEN}Previewing production build...${NC}"
  cd frontend || cd frontend-backup
  
  # Check if build exists
  if [ ! -d "dist" ]; then
    echo -e "${YELLOW}No build found. Building first...${NC}"
    npm run build
  fi
  
  npm run preview
}

# Display help
show_help() {
  echo "Usage:"
  echo "  ./run.sh [command]"
  echo ""
  echo "Available commands:"
  echo "  dev       Start the development server (default if no command is provided)"
  echo "  test      Run tests"
  echo "  build     Build for production"
  echo "  preview   Preview the production build"
  echo "  help      Show this help message"
}

# Handle command
case "$1" in
  "test")
    run_tests
    ;;
  "build")
    build_prod
    ;;
  "preview")
    preview_prod
    ;;
  "help")
    show_help
    ;;
  "dev"|"")
    run_dev
    ;;
  *)
    echo -e "${RED}Unknown command: $1${NC}"
    show_help
    exit 1
    ;;
esac