/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '500mb', // Change this to your desired file upload size limit
        },
    },
}

export default nextConfig



  