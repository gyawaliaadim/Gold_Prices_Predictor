# 🪙 Gold Price Predictor

Predict the gold price for Nepal based on historical data from 2025 to 2026. This project has two main parts:

1. **prediction_model**: Python FastAPI backend for ML prediction.
2. **webUI**: Next.js + ShadCN UI frontend for selecting date and showing predicted price along with historical chart.

---

## 📁 Folder Structure

- `prediction_model/` - Contains ML pipeline, FastAPI server, and data.
- `webUI/` - Frontend in React/Next.js.

---

## 📝Setup Instructions
Run two terminals:
### ⚙️ Terminal 1. Backend (Prediction Model)
```bash
cd prediction_model
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload
The API will be available at http://localhost:8000.
```

#### 🖥️ Terminal 2. Frontend (Web UI)
```bash
cd webUI
npm install
npm run dev
The UI will be available at http://localhost:3000.
```

## 📌 Usage

- Pick a date from the calendar.

- Click Get Predicted Price.

- A historical chart is provided.

## 👨‍💻 Technologies Used
- Python, Pandas, Scikit-learn
  - Linear Regression Model
  - Model loading and saving using joblib
- FastAPI
- Next.js, React, ShadCN UI


---

## 🖼️ Screenshots
### Web UI: 
<img width="640" height="360" alt="Screenshot 2026-01-16 174930" src="https://github.com/user-attachments/assets/802fd861-490b-494c-a5b7-833693a7209b" />
<img width="640" height="360" alt="Screenshot 2026-01-16 174715" src="https://github.com/user-attachments/assets/0debb1a1-8599-4da1-8af8-9c5a0ce422d8" />
<br>

### Python:

<br>

<img width="640" height="360" alt="Screenshot 2026-01-16 174646" src="https://github.com/user-attachments/assets/8048c794-31b4-4396-98e8-adc79f175799" />

<img width="640" height="360" alt="Screenshot 2026-01-16 1747165" src="https://github.com/user-attachments/assets/9694856e-9573-4187-8988-a4786dcb4080" />

## -By Aadim Gyawali
