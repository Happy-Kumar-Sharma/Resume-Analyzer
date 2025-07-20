# This file is responsible to run the application and expose public url with the help of ngrok
import nest_asyncio
from pyngrok import ngrok
import uvicorn
from main import app

# Allow nested asyncio loops (needed in Colab)
nest_asyncio.apply()

import os

ngrok_port = int(os.environ.get("NGROK_PORT", "8000"))
public_url = ngrok.connect(ngrok_port)
print(f"🔗 Public URL: {public_url}")

# Run the app
uvicorn.run(app, host="0.0.0.0", port=ngrok_port)
