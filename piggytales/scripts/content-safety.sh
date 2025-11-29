#!/bin/bash
# PiggyTales - Content Safety Check
# Usage: ./scripts/content-safety.sh <file>

FILE=$1

if [ -z "$FILE" ]; then
    echo "🐷❌ Usage: content-safety.sh <file>"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "🐷❌ File not found: $FILE"
    exit 1
fi

echo "🐷🍄 PiggyTales - Content Safety Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📄 File: $FILE"
echo ""

# Prohibited content patterns (Vietnamese and English)
PROHIBITED_PATTERNS=(
    # Violence
    "máu|blood|gore|violence|bạo lực|giết|kill|murder"
    # Horror
    "kinh dị|horror|scary|sợ hãi|ác mộng|nightmare"
    # Profanity (common terms)
    "đ.m|fuck|shit|damn|chửi|curse"
    # Substances
    "ma túy|drug|rượu|alcohol|thuốc lá|smoke|cigarette"
)

FOUND_ISSUES=0

for pattern in "${PROHIBITED_PATTERNS[@]}"; do
    matches=$(grep -iE "$pattern" "$FILE" 2>/dev/null)
    if [ -n "$matches" ]; then
        echo "🐷❌ PROHIBITED content detected:"
        echo "$matches" | head -5
        echo ""
        FOUND_ISSUES=1
    fi
done

# Warning patterns
WARNING_PATTERNS=(
    "chết|death|die|mất|loss"
    "buồn|sad|crying|khóc"
    "đánh nhau|fight|conflict|xung đột"
)

for pattern in "${WARNING_PATTERNS[@]}"; do
    matches=$(grep -iE "$pattern" "$FILE" 2>/dev/null)
    if [ -n "$matches" ]; then
        echo "🐷❓ Review recommended:"
        echo "$matches" | head -3
        echo ""
    fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FOUND_ISSUES -eq 1 ]; then
    echo "🐷❌ BLOCKED: Prohibited content found"
    exit 2
else
    echo "🍄✨ PASSED: No prohibited content"
    exit 0
fi
