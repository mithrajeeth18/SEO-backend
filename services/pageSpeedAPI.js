const axios = require("axios");
const cheerio = require("cheerio");

// Helper to get common keywords
const getCommonKeywords = (text) => {
  const words = text.match(/\b\w+\b/g); // Match words
  const frequency = {};

  words.forEach((word) => {
    word = word.toLowerCase();
    if (
      word.length > 3 &&
      ![
        "function",
        "return",
        "document",
        "classlist",
        "more",
        "matchheight",
      ].includes(word)
    ) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  return Object.keys(frequency)
    .sort((a, b) => frequency[b] - frequency[a])
    .slice(0, 10);
};

// Helper to get meta description
const getMetaDescription = ($) => {
  const description = $('meta[name="description"]').attr("content");
  return description || "No meta description found.";
};

// Function to fetch and analyze the webpage
exports.fetchPageSpeedData = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract meta description and keywords
    const metaDescription = getMetaDescription($);
    const bodyText = $("body").text();
    const keywords = getCommonKeywords(bodyText);

    return { metaDescription, keywords };
  } catch (error) {
    throw new Error("Unable to analyze the URL.");
  }
};

// New function to load page content into Cheerio
exports.loadPageContent = async (url) => {
  try {
    const response = await axios.get(url);
    return cheerio.load(response.data); // Return Cheerio instance for further analysis
  } catch (error) {
    throw new Error("Unable to load the page content.");
  }
};
