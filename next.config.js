/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    buildExcludes: [/middleware-manifest.json$/],
    // register: true,
    // skipWaiting: false
  },
  reactStrictMode: true,
})
