#!/bin/bash
cd /home/z/my-project
while true; do
    echo "$(date): Starting server..." >> /home/z/my-project/dev.log
    node --max-old-space-size=256 .next/standalone/server.js -p 3000 2>&1 >> /home/z/my-project/dev.log
    echo "$(date): Server died, restarting in 1s..." >> /home/z/my-project/dev.log
    sleep 1
done
