/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust according to where your components are located
    "./components/**/*.{js,ts,jsx,tsx}", // Include component directory
    "./node_modules/nativewind/dist/**/*.js", // Ensure NativeWind files are included
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
