const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/Suggestions", async (req, res, next) => {
  console.log("Received request for suggestions");

  try {
    // Store the JSON data from the frontend
    const jsonData = req.body; // Getting JSON data from the frontend

    // Prepare the prompt with the JSON data
    const prompt = `Analyze the following JSON structure. Based on the provided meta description, keywords, and SEO title, suggest more effective keywords that reflect the purpose of the website and improve its SEO performance. Additionally, provide alternative title suggestions that are concise, descriptive, and enhance the website's visibility. For each suggested keyword and title, include a brief explanation for why it is recommended. Generate only the following JSON structure with the suggestions, and do not provide any additional text, explanations, or paragraphs. {
      "suggestedKeyword": ["...", "...", "..."],
      "title_suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
      "explanationForRecommendations": ["explanation for keyword 1", "explanation for keyword 2", "explanation for title 1", "explanation for title 2"]
    } Here is the data: ${JSON.stringify(jsonData)}`;
 // Convert jsonData to a string

    // Prepare the JSON data for the external POST request
    const postData = {
      model: "llama3",
      prompt: prompt, // Using the constructed prompt
      stream: false,
    };

    // Make the POST request to http://localhost:11434/api/generate/
    const responses = await axios.post(
      "http://127.0.0.1:11434/api/generate/",
      postData
    );

    // Send the response from the external API back to the frontend
    const result = JSON.parse(responses.data.response);
    res.status(200).json(result);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
});

module.exports = router;
