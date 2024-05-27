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
        domains: ["localhost", "api.vietqr.io", "vietqr.net", "img.vietqr.io"],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "api.vietqr.io",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "vietqr.net",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "img.vietqr.io",
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
    experimental: {
        turbo: {
            resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
            rules: {
                "*.svg": {
                    loaders: ["@svgr/webpack"],
                    as: "*.js",
                },
            },
        },
    },
};

export default nextConfig;
