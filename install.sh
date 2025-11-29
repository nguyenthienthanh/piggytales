#!/bin/bash

# PiggyTales Installation Script
# Version: 1.0.0
# Description: Install PiggyTales - AI Content Creation for Children & Teens! 🐷🍄
# Platform: Claude Code (https://docs.anthropic.com/en/docs/claude-code)
#
# ⚠️  DEPRECATED: This script is for manual installation only.
# ⚠️  The recommended method is now the Claude Code plugin system:
# ⚠️
# ⚠️  In Claude Code terminal, run:
# ⚠️  /plugin marketplace add nguyenthienthanh/piggytales
# ⚠️  /plugin install piggytales@piggytales
# ⚠️
# This script remains for backwards compatibility and legacy installations.

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PINK='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
PIGGYTALES_VERSION="1.0.0"
INSTALL_DIR="$HOME/.claude/plugins/marketplaces/piggytales"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Functions
print_header() {
    echo ""
    echo -e "${PINK}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "🐷🍄 PiggyTales Installation v${PIGGYTALES_VERSION}"
    echo -e "Where Piggy & Shroom tell amazing tales! ✨"
    echo -e "${PINK}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}🍄✨ $1${NC}"
}

print_error() {
    echo -e "${RED}🐷❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}🐷❓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

check_claude_code() {
    if ! command -v claude &> /dev/null; then
        print_warning "Claude Code CLI not found in PATH"
        print_info "Install from: https://docs.anthropic.com/en/docs/claude-code"
        return 1
    fi
    print_success "Claude Code CLI found"
    return 0
}

install_plugin() {
    print_info "Installing PiggyTales..."

    # Create plugins directory if needed
    mkdir -p "$HOME/.claude/plugins/marketplaces"

    # Copy or link plugin
    if [ -d "$INSTALL_DIR" ]; then
        print_warning "Existing installation found, updating..."
        rm -rf "$INSTALL_DIR"
    fi

    cp -r "$SCRIPT_DIR" "$INSTALL_DIR"

    print_success "PiggyTales installed to $INSTALL_DIR"
}

show_next_steps() {
    echo ""
    echo -e "${PINK}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "🐷🍄 Installation Complete!"
    echo -e "${PINK}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Start Claude Code:"
    echo "   $ claude"
    echo ""
    echo "2. Verify installation:"
    echo "   /tale help"
    echo ""
    echo "3. Create your first project:"
    echo "   /tale new audiobook \"My First Story\""
    echo ""
    echo "4. Configure voice API (optional):"
    echo "   See piggytales/VOICEOVER_SETUP.md"
    echo ""
    echo -e "🍄✨ Happy storytelling!"
    echo ""
}

# Main
print_header

print_info "Checking prerequisites..."
check_claude_code || exit 1

install_plugin
show_next_steps
