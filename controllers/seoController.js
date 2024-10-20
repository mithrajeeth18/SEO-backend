const pageSpeedAPI = require("../services/pageSpeedAPI");
const keywordAnalysis = require("../services/keywordAnalysis");
const linkRatioAnalysis = require("../services/linkRatioAnalysis");
const titleAnalysis = require("../services/titleAnalysis");
const imageAltAnalysis = require("../services/imageAltAnalysis");

exports.analyzeSEO = async (req, res, next) => {
  try {
    const { url } = req.query;
    const data = await pageSpeedAPI.fetchPageSpeedData(url);

    
    const $ = await pageSpeedAPI.loadPageContent(url);

   
    const keywordsInTitleAndDescription =
      keywordAnalysis.analyzeKeywordsInTitleAndDescription($, data.keywords);

    const linkRatio = linkRatioAnalysis.analyzeLinkRatio($, url);

    
    const seoTitle = titleAnalysis.analyzeSEOTitle($);

    const imageAlt = imageAltAnalysis.analyzeImageAltAttributes($);

    
    res.status(200).json({
      ...data, 
      keywordsInTitleAndDescription,
      linkRatio,
      seoTitle,
      imageAlt,
    });
  } catch (error) {
    next(error);
  }
};
