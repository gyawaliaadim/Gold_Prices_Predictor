print("Starting forecasting API...")

# =========================
# Imports
# =========================
from features import build_time_features
import pandas as pd
import numpy as np
import os
import joblib
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer
from sklearn.linear_model import LinearRegression



# =========================
# Constants
# =========================
ORIGIN_DATE = pd.Timestamp("2019-01-01")

MODEL_FILE = "model_files/model.pkl"
PIPELINE_FILE = "model_files/pipeline.pkl"

os.makedirs("model_files", exist_ok=True)

# =========================
# Pipeline
# =========================
pipeline = Pipeline([
    ("time_features", FunctionTransformer(build_time_features))
])

# =========================
# Train Once (If Needed)
# =========================
if not os.path.exists(MODEL_FILE):
    print("Training forecasting model...")

    df = pd.read_csv("data/processed_Data.csv").dropna()
    X = df[["year", "month", "day"]]
    y = df["price"]

    X_transformed = pipeline.fit_transform(X)

    model = LinearRegression()
    model.fit(X_transformed, y)

    joblib.dump(model, MODEL_FILE)
    joblib.dump(pipeline, PIPELINE_FILE)

    print("Model trained and saved.")

# =========================
# Load Model (Startup)
# =========================
model = joblib.load(MODEL_FILE)
pipeline = joblib.load(PIPELINE_FILE)

# =========================
# FastAPI App
# =========================
app = FastAPI(title="Gold Price Prediction API")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    year: int
    month: int
    day: int

@app.post("/predict")
def predict_price(data: PredictionRequest):
    # print(data.dict())
    df = pd.DataFrame([data.dict()])

    X_transformed = pipeline.transform(df)
    prediction = model.predict(X_transformed)[0]

    return {
        "predicted_price": round(float(prediction), 2)
    }
