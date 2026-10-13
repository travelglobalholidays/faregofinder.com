/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://faresgofinder.com",
  sourceDir: process.env.NEXT_BUILD_DIR || ".next",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => Promise.all([
    "/flights",
    "/flights/airline-reserrvations",
    "/flights/cheap-flight-deals",
    "/flights/one-way",
    "/flights/round-trip",
    "/flights/cheap-flight-ticket",
  ].map((path) => config.transform(config, path))),
};
