echo "Creating Python virtual environment at 'venv'..."
python3 -m venv venv
source venv/bin/activate
echo "Installing requirements.txt..."
pip install -r requirements.txt
deactivate