const urlModule = require("url");

exports.analyzeLinkRatio = ($, pageUrl) => {
  const { hostname: pageHostname } = new urlModule.URL(pageUrl);
  let internalLinks = 0;
  let externalLinks = 0;

  $("a").each((i, link) => {
    const href = $(link).attr("href");

    if (href) {
      const linkUrl = new urlModule.URL(href, pageUrl); // Resolve relative URLs

      if (linkUrl.hostname === pageHostname) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    }
  });

  return {
    internalLinks,
    externalLinks,
  };
};
