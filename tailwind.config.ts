import type { Config } from "tailwindcss";

const config: Config = {
<<<<<<< HEAD
  // Verifique se os caminhos abaixo estão corretos de acordo com suas pastas
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Garantindo que o Indigo apareça
        indigo: {
          50: '#f5f3ff',
          100: '#ede9fe',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
=======
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '2xl': '1.5rem',
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
>>>>>>> 0c2212d (Primeiro deploy do Saas)
    },
  },
  plugins: [],
};
export default config;