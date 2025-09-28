#!/bin/bash

# Start the Bun server in the background
echo "Starting server..."
bun run index.ts &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Start ngrok tunnel
echo "Starting ngrok tunnel..."
ngrok http 3000 --log=stdout &
NGROK_PID=$!

# Wait for ngrok to establish tunnel
sleep 3

# Get ngrok public URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"https://[^"]*' | cut -d'"' -f4 | head -1)

if [ -z "$NGROK_URL" ]; then
    echo "Failed to get ngrok URL"
    kill $SERVER_PID $NGROK_PID 2>/dev/null
    exit 1
fi

echo ""
echo "======================================="
echo "Server is running with ngrok!"
echo "======================================="
echo "Public URL: $NGROK_URL"
echo ""
echo "IMPORTANT: Add this URL to your TikTok app's redirect URLs:"
echo "$NGROK_URL/api/auth/callback/tiktok"
echo ""
echo "TikTok OAuth URL:"
echo "$NGROK_URL/api/auth/sign-in/social?provider=tiktok"
echo ""
echo "API Endpoints:"
echo "- Health: $NGROK_URL/health"
echo "- Session: $NGROK_URL/api/auth/session"
echo "- Profile: $NGROK_URL/api/tiktok/profile"
echo "======================================="
echo ""
echo "Press Ctrl+C to stop the server and ngrok"

# Handle cleanup on exit
cleanup() {
    echo "Shutting down..."
    kill $SERVER_PID $NGROK_PID 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Keep script running
wait $SERVER_PID