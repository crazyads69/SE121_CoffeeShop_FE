/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/",
                destination: "/admin",
            },
        ];
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        // Important: return the modified config
        config.module.rules.push({
            test: /\.node$/,
            use: "file-loader",
        });

        return config;
    },
    images: {
        domains: ["localhost"],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "",
                pathname: "**",
            },
        ],
    },
    reactStrictMode: false,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    output: "standalone",
};

export default nextConfig;
