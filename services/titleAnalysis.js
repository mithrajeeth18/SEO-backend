exports.analyzeSEOTitle = ($) => {
  const title = $("title").text();
  const titleLength = title.length;
  return { title, titleLength };
};
