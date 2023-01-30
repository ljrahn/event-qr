#!/bin/bash
cd ./scripts

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate

pip3 install -r requirements.txt

if [ ! -f "firebase-privatekey.json" ]; then
    echo "WARNING: 'firebase-privatekey.json' does not exist. Please retrieve this file from firebase."
fi
