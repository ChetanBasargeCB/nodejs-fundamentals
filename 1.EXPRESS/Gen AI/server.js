import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Gemini API");
});

console.log("API Key loaded:", process.env.API_KEY ? "Yes" : "No");

// provide API Here
const genAI = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

// propmt to AI

const generate = async (topic) => {
  try {
    const prompt = `Generate a quiz about ${topic} at a Basic difficulty. 
  Return exactly 5 questions in this JSON format:
  [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": 0 (index of correct option)
    }
  ]
  Return only the JSON array without any markdown formatting or code blocks.`;
 
    console.log("Asking Gemini...");
 
    // new  updated function of gemini thath is //! models.generateContent
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });  
    const data = result.text 

    console.log(data,"api data")

    if(!data) return res.status(429).json({message:"API Tokend Ended "})
    return data
  } catch (error) {
    console.error("Error generating content:", error);
   
  }
};    
    
app.post("/AI",async(req,res)=>{
    try {
    const data = req.body.data.question  
    console.log("Topic",data)
    const result = await generate(data);
    res.send(result)
    } catch (error) {
        console.log("Question geting error",error)
    }
})   

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
