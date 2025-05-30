/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: {
            bodySizeLimit: '500mb', // Only keep this if you need large uploads
        },
    },
    images: {
        disableStaticImages: true,
        unoptimized: true, // Disable Next.js image optimization
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.curtainsetup.ae',
                pathname: '/uploads/**',
            },
        ],
    },
    // If you use external images, set allowed domains:
    // images: {
    //     domains: ['your-image-domain.com'],
    // },
    //output: 'standalone', // Recommended for VPS/Docker/Node hosting
}

export default nextConfig
