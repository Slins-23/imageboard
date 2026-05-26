if [ ! -d "venv" ]; then
    ./install.sh
fi

source venv/bin/activate
python -m orchestrator.cli up
