/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
<<<<<<< HEAD
    '@tailwindcss/postcss': {}, // O erro acontece porque aqui estava apenas 'tailwindcss'
    autoprefixer: {},
=======
    '@tailwindcss/postcss': {}, // É essa linha que resolve o erro do seu print!
    'autoprefixer': {},
>>>>>>> 0c2212d (Primeiro deploy do Saas)
  },
};

export default config;