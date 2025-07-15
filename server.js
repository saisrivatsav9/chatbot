const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const { OpenAI } = require("openai");
require("dotenv").config();
const path = require("path");


const app = express();
app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080"]
}));
app.use(bodyParser.json());

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Optional fallback route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//const openai = new OpenAI({
  //apiKey: process.env.OPENAI_API_KEY,
//});

app.post("/api/chat", async (req, res) => {
  console.log("✅ Received message:", req.body.message);

  // DUMMY RESPONSE LOGIC - replace OpenAI call for now
  try {
    let dummyReply = "Sorry! I’m just a prototype right now. But in a real scenario, I'd help you with roadside assistance or membership info.";

    const userMsg = req.body.message.toLowerCase();
    if (userMsg.includes("tow") || userMsg.includes("roadside")) {
      dummyReply = "Of course! AAA offers 24/7 roadside assistance including towing, jump-starts, tire service, and more. Would you like me to connect you to the nearest service center?";
    } else if (userMsg.includes("membership")) {
      dummyReply = "AAA membership offers great benefits including discounts, travel planning, and emergency services.";
    } else if (userMsg.includes("hours") || userMsg.includes("open")) {
      dummyReply = "Our offices are open Monday to Friday from 9 AM to 6 PM.";
    } else if (userMsg.includes("hi") || userMsg.includes("hello") || userMsg.includes("hey")) {
      dummyReply = "Hello, how can I help you?";
    }

    console.log("✅ Dummy reply:", dummyReply);
    res.json({ reply: dummyReply });
  } catch (error) {
    console.error("❌ Error in dummy handler:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
