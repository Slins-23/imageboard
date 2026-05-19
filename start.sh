if [ ! -d "venv" ]; then
    ./install.sh
fi

source venv/bin/activate
echo "Starting..."
python -m orchestrator.cli up
