if [ ! -d "venv" ]; then
    echo "Enabling execute permission for install.sh..."
    chmod +x install.sh
    echo "Running install.sh..."
    ./install.sh
fi

source venv/bin/activate
python -m orchestrator.cli up
