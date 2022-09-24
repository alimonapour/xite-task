module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        16: 'repeat(auto-fit, minmax(240px, 1fr))',

        // Complex site-specific column configuration
        footer: '200px minmax(900px, 1fr) 100px',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
