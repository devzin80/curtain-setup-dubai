/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // <-- very important if you're using the App Router
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['var(--font-montserrat)'],
            },
        },
    },
    plugins: [],
}
