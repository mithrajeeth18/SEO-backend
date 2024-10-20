exports.analyzeKeywordsInTitleAndDescription = ($, commonKeywords) => {
  const title = $("title").text();
  const description = $('meta[name="description"]').attr("content") || "";

  const titleKeywords = commonKeywords.filter((keyword) =>
    title.toLowerCase().includes(keyword)
  );
  const descriptionKeywords = commonKeywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );

  return { titleKeywords, descriptionKeywords };
};
