/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://faresgofinder.com",
  sourceDir: process.env.NEXT_BUILD_DIR || ".next",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => [await config.transform(config, "/flights")],
};
