#!/bin/bash

# PiggyTales Supabase Setup Script
# This script helps set up the Supabase database for PiggyTales

set -e

echo "🐷🍄 PiggyTales - Supabase Setup"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}No .env file found. Creating from .env.example...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}Created .env file. Please edit it with your Supabase credentials.${NC}"
        echo ""
        echo "Required variables:"
        echo "  - SUPABASE_URL"
        echo "  - SUPABASE_SERVICE_KEY"
        echo ""
        exit 1
    else
        echo -e "${RED}No .env.example found. Please create .env manually.${NC}"
        exit 1
    fi
fi

# Load environment variables
source .env

# Check required variables
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_KEY" ]; then
    echo -e "${RED}Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env${NC}"
    exit 1
fi

echo -e "${GREEN}Environment variables loaded${NC}"
echo "Supabase URL: $SUPABASE_URL"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${YELLOW}Supabase CLI not found. Installing...${NC}"

    # Detect OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install supabase/tap/supabase
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        npm install -g supabase
    else
        echo -e "${RED}Please install Supabase CLI manually: https://supabase.com/docs/guides/cli${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}Supabase CLI found${NC}"
echo ""

# Menu
echo "What would you like to do?"
echo ""
echo "1. Run migrations (create tables)"
echo "2. Run seeds (insert initial data)"
echo "3. Run both migrations and seeds"
echo "4. Reset database (dangerous!)"
echo "5. Check connection"
echo "6. Exit"
echo ""
read -p "Enter choice [1-6]: " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}Running migrations...${NC}"
        echo "Please run the SQL in database/migrations/001_initial_schema.sql"
        echo "in your Supabase SQL Editor at: ${SUPABASE_URL}/project/default/sql"
        echo ""
        echo "Or use: supabase db push"
        ;;
    2)
        echo ""
        echo -e "${YELLOW}Running seeds...${NC}"
        echo "Please run the SQL in database/seeds/001_initial_data.sql"
        echo "in your Supabase SQL Editor at: ${SUPABASE_URL}/project/default/sql"
        ;;
    3)
        echo ""
        echo -e "${YELLOW}Running migrations and seeds...${NC}"
        echo "Please run the SQL files in order:"
        echo "1. database/migrations/001_initial_schema.sql"
        echo "2. database/seeds/001_initial_data.sql"
        echo "in your Supabase SQL Editor at: ${SUPABASE_URL}/project/default/sql"
        ;;
    4)
        echo ""
        echo -e "${RED}WARNING: This will delete all data!${NC}"
        read -p "Are you sure? Type 'yes' to confirm: " confirm
        if [ "$confirm" == "yes" ]; then
            echo "Please run the following in Supabase SQL Editor:"
            echo ""
            echo "DROP SCHEMA public CASCADE;"
            echo "CREATE SCHEMA public;"
            echo "GRANT ALL ON SCHEMA public TO postgres;"
            echo "GRANT ALL ON SCHEMA public TO public;"
            echo ""
            echo "Then run migrations and seeds again."
        else
            echo "Cancelled."
        fi
        ;;
    5)
        echo ""
        echo -e "${YELLOW}Testing connection...${NC}"

        # Test with curl
        response=$(curl -s -o /dev/null -w "%{http_code}" \
            "${SUPABASE_URL}/rest/v1/" \
            -H "apikey: ${SUPABASE_SERVICE_KEY}" \
            -H "Authorization: Bearer ${SUPABASE_SERVICE_KEY}")

        if [ "$response" == "200" ]; then
            echo -e "${GREEN}Connection successful!${NC}"
        else
            echo -e "${RED}Connection failed. HTTP status: $response${NC}"
            echo "Please check your SUPABASE_URL and SUPABASE_SERVICE_KEY"
        fi
        ;;
    6)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
