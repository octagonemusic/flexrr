import typographyPlugin from '@tailwindcss/typography'

const config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.300'),
              },
            },
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            h4: { color: theme('colors.white') },
            h5: { color: theme('colors.white') },
            h6: { color: theme('colors.white') },
            strong: { color: theme('colors.white') },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.700'),
            },
            code: { color: theme('colors.gray.200') },
            'ol > li::marker': { color: theme('colors.gray.400') },
            'ul > li::marker': { color: theme('colors.gray.400') },
          },
        },
        invert: {
          css: {
            color: theme('colors.white'),
          },
        },
      }),
    },
  },
  plugins: [typographyPlugin],
  // Make sure these classes are included in the build
  safelist: ['prose', 'prose-invert', 'prose-white', 'prose-lg'],
}

export default config
