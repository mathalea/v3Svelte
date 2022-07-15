const plugin = require("tailwindcss/plugin")
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        coopmaths: {
          DEFAULT: "#F15929",
          lightest: "#FF8C5C",
          light: "#FF7343",
          dark: "#D84010",
          darkest: "#BE2600",
        },
      },
    },
  },
  variants: {
    display: ["group-hover"],
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      })
    }),
  ],
}

module.exports = config
