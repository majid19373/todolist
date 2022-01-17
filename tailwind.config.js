module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        boxShadow: {
          'card': '0px 4px 23px rgba(85, 123, 221, 0.08)',
          'modal': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }
    },
    colors: {
      'backgroundCustom': '#E5E5E5',
      'textCustom': '#545454',
      'infoCustom': '#609FFF',
      'errorCustom': '#F85757',
      'blueCustom': '#457BCF',
      'blue2Custom': '#557BDD',
      'successCustom': '#3EF520',
      'modalCustom': 'rgba(130, 130, 130, 0.3)',
      'white2Custom': '#DEDEDE',
      'grayCustom': '#828282',
      'whiteCustom': '#fff',
      'blackCustom': '#000',
    },
  },
  plugins: [],
}
