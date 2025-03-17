#!/bin/bash

# API endpoint
URL="http://localhost:3000/api/orders"

# Predefined list of countries
COUNTRIES=("Estonia" "USA" "Eswatini")

# Predefined list of payment descriptions
DESCRIPTIONS=("Payment for services" "Online purchase" "Subscription fee" "Consulting fee" "Software license" "Event ticket" "Donation" "Freelance work" "Invoice payment" "Membership fee")

# Loop to generate and send 30 requests
for ((i=1; i<=5; i++)); do
    ORDER_NUMBER=$((110 + i)) # Generate a unique order number
    DESCRIPTION=${DESCRIPTIONS[$RANDOM % ${#DESCRIPTIONS[@]}]} # Random payment description
    COUNTRY=${COUNTRIES[$RANDOM % ${#COUNTRIES[@]}]} # Random country
    AMOUNT=$(awk -v min=50 -v max=500 'BEGIN{srand(); print min+rand()*(max-min)}') # Random amount between 50 and 500
    PAYMENT_DUE_DATE="2025-03-11"

    # Create JSON payload
    JSON_PAYLOAD=$(cat <<EOF
{
    "orderNumber": $ORDER_NUMBER,
    "paymentDescription": "$DESCRIPTION",
    "streetAddress": "123 Main Street",
    "town": "Tallinn",
    "country": "$COUNTRY",
    "amount": $AMOUNT,
    "currency": "EUR",
    "paymentDueDate": "$PAYMENT_DUE_DATE"
}
EOF
)

    # Send POST request
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$URL" \
        -H "Content-Type: application/json" \
        -d "$JSON_PAYLOAD")

    # Log success or failure
    if [ "$RESPONSE" -eq 200 ] || [ "$RESPONSE" -eq 201 ]; then
        echo "Order $ORDER_NUMBER sent successfully."
    else
        echo "Failed to send order $ORDER_NUMBER. HTTP status: $RESPONSE"
    fi
done
