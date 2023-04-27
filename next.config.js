/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  frame-src https://www.google.com;
  frame-ancestors https://www.google.com;
`
const nextConfig = {
  async headers(){ 
    return [
      {
        source: "/:path*",
        headers:
          [{
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          }, {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade'
          }]
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
