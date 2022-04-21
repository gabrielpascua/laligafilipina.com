// Default Configuration:
// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js

module.exports = {
    content: [
        "./src/components/**/*.{html,jsx}",
        "./site/**/*.html"
    ],
    theme: {
        container: {
            center: true,
            padding: "0.5rem"
        },
        extend: {},
    },
    plugins: [],
}