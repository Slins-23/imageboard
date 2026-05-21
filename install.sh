if [ -d "venv" ]; then
echo "Error: 'venv' folder already exists. Delete it first."
exit 1
fi

echo "Creating Python virtual environment at 'venv'..."
python3 -m venv venv
source venv/bin/activate
echo "Installing requirements.txt..."
pip install -r requirements.txt
deactivate

echo "Installing orchestrator post-renderer orchestrator Helm plugin..."
chmod +x orchestrator/post-renderer/run.sh
helm plugin install orchestrator/post-renderer

echo "Finished installation."