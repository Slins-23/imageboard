#!/usr/bin/env bash

set -e

echo "Installing orchestrator..."

if [ -d "venv" ]; then
    echo "Error: 'venv' folder already exists. Delete it first if you want to reinstall."
    exit 1
fi

if helm plugin list | grep -q "post-renderer"; then
    echo "Orchestrator Helm post renderer plugin 'post-renderer' already exists. Ignoring."
else
    echo "Installing orchestrator post-renderer Helm plugin..."
    chmod +x orchestrator/post-renderer/run.sh
    helm plugin install orchestrator/post-renderer
fi

echo "Creating Python virtual environment at 'venv'..."
python3 -m venv venv
# source venv/bin/activate
echo "Installing requirements.txt..."
venv/bin/pip install -r requirements.txt
# pip install -r requirements.txt
# deactivate

echo "Installing orchestrator binary into virtual environment..."
venv/bin/pip install -e orchestrator

echo "Creating '$HOME/.local/bin' folder if it doesn't exist..."
mkdir -p "$HOME/.local/bin"

echo "Linking binary from virtual environment to '$HOME/.local/bin/orchestrator'..."
ln -sf "$(pwd)/venv/bin/orchestrator" "$HOME/.local/bin/orchestrator"

if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    echo ""
    echo "Adding '$HOME/.local/bin' to path by appending it to '$HOME/.bashrc'..."
    echo "export PATH=\$HOME/.local/bin:\$PATH" >> "$HOME/.bashrc"
    echo "- If using another shell, append 'export PATH=\$HOME/.local/bin:\$PATH' to its configuration file."
    echo ""
fi

# echo "Enabling execute permissions for start.sh, stop.sh, and restart.sh..."
# chmod +x start.sh stop.sh restart.sh

echo "Finished the installation."

echo ""
echo "In order to use the orchestrator, restart the shell or run:"
echo ""
echo "export PATH=\$HOME/.local/bin:\$PATH"
echo ""