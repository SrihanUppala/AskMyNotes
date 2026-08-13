from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://askmynotes-frontend-p06p.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("askmynotes_classifier.pkl")

class QuestionRequest(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "AskMyNotes Classifier API Running"}

@app.post("/predict")
def predict(data: QuestionRequest):

    prediction = model.predict([data.question])[0]

    return {
        "question": data.question,
        "predicted_category": prediction
    }