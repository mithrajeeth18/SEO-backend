// services/imageAltAnalysis.js
exports.analyzeImageAltAttributes = ($) => {
  const images = $("img");

  if (images.length === 0) {
    return { imageALT: "no image" };
  }

  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;

  images.each((i, img) => {
    if ($(img).attr("alt")) {
      imagesWithAlt++;
    } else {
      imagesWithoutAlt++;
    }
  });

  if (imagesWithoutAlt === 0) {
    return {
      imageALT: "all images have alt attributes",
      totalImages: images.length,
    };
  } else if (imagesWithAlt === 0) {
    return {
      imageALT: "no images have alt attributes",
      totalImages: images.length,
    };
  } else {
    return {
      imageALT: "some images have alt attributes but some do not",
      totalImages: images.length,
      imagesWithoutAlt,
      imagesWithAlt,
    };
  }
};
