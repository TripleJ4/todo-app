module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  important: "#app",
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      primary: "rgba(0,0,0,0.85)",
      secondary: "rgba(0,0,0,0.45)",
      black: "rgba(0,0,0,1)",
      inherit: "inherit",
      white: "white",
    },
    //sizes matched to AntDesign
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
