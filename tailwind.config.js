/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
        backgroundSize: {
            "100%" : "100% 100%"
        },
        fontSize: {
            'cardsSEL' : ['3vw', {
                lineHeight: 'normal',
                letterSpacing: '0.5px',
                fontWeight: 'normal',
            }],
        }
    }
  },
  plugins: [],
}
