#!/bin/bash
# PiggyTales - API Connectivity Check
# Usage: ./scripts/api-check.sh

echo "🐷🍄 PiggyTales - API Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Vbee API
echo ""
echo "Checking Vbee API..."
if [ -z "$VBEE_API_KEY" ]; then
    echo "🐷❌ VBEE_API_KEY not set"
else
    # Simple connectivity check
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: Bearer $VBEE_API_KEY" \
        "${VBEE_API_URL:-https://api.vbee.vn}/v1/voices" 2>/dev/null)

    if [ "$response" = "200" ]; then
        echo "🍄✨ Vbee API: Connected"
    elif [ "$response" = "401" ]; then
        echo "🐷❌ Vbee API: Invalid API key"
    else
        echo "🐷❓ Vbee API: Status $response"
    fi
fi

# Check ElevenLabs API (optional)
echo ""
echo "Checking ElevenLabs API..."
if [ -z "$ELEVENLABS_API_KEY" ]; then
    echo "🐷❓ ELEVENLABS_API_KEY not set (optional)"
else
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "xi-api-key: $ELEVENLABS_API_KEY" \
        "https://api.elevenlabs.io/v1/user" 2>/dev/null)

    if [ "$response" = "200" ]; then
        echo "🍄✨ ElevenLabs API: Connected"
    elif [ "$response" = "401" ]; then
        echo "🐷❌ ElevenLabs API: Invalid API key"
    else
        echo "🐷❓ ElevenLabs API: Status $response"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "API check complete."
