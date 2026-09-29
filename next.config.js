/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://api.veloradz.shop/admin',
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: 'https://api.veloradz.shop/admin/:path*',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Tell browsers not to upgrade to HTTP/3 (QUIC) when Cloudflare passes this through.
          { key: 'Alt-Svc', value: 'clear' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
