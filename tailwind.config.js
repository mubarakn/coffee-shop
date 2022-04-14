module.exports = {
    important: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "login-poster": "url(/images/login-poster.jpg)",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
