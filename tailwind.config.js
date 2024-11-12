/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#144464",
        "primary-h": "#2b5673",
        "success": "#4ca484",
        "success-h": "rgba(76,164,132,0.9)",
        "warning": "#faac84",
        "warning-h": "rgba(250,172,132,0.9)",
        "danger": "#cd4c34",
        "danger-h": "rgba(205,76,52,0.9)",
        "danger-x": "rgba(205,76,52,0.2)",
        "secondary": "#2e4e5d",
        "secondary-h": "rgba(46,78,93,0.9)"
      }
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.15em'
    }
  },
  plugins: [
    require('flowbite/plugin')({
      datatables: true,
    }),
  ],
}
