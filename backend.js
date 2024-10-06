const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Make sure to install this if it's a package

const app = express();
const port = 3000; // You can choose any available port
const genAI = new GoogleGenerativeAI("AIzaSyDPsw2l4gWxqsUsYIRE0ILG-te0sbtXM7o");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.use(cors());
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Error generating content" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
