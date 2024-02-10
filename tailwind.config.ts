/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/html/utils/withMT");

const config: Config = withMT({
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {},
    plugins: [],
});
export default config;
