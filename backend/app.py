from fastapi import FastAPI

app = FastAPI(title="Lens API" )

@app.get("/")
def home():
    return {"status": "API A OKay"} 