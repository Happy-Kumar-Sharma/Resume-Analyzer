# This file is responsible to run the application and expose public url with the help of ngrok
import nest_asyncio
from pyngrok import ngrok
import uvicorn
from main import app

# Allow nested asyncio loops (needed in Colab)
nest_asyncio.apply()

# Open an ngrok tunnel to the app
public_url = ngrok.connect(8001)
print(f"🔗 Public URL: {public_url}")

# Run the app
uvicorn.run(app, host="0.0.0.0", port=8001)
