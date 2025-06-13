import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/pages/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            screens: {
                xs: '480px',
            },
        },
    },
    plugins: [],
};
export default config;
