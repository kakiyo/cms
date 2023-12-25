/** @type {import('next').NextConfig} */

const config = require("./environment.json");
const env = config[process.env.NEXT_PUBLIC_ENV || "localhost"];

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API: env.api_url,
    NEXT_PUBLIC_TITLE: env.title,
    NEXT_PUBLIC_COLOR: env.color,
  },
};

module.exports = nextConfig;
