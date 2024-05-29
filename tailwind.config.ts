import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bg-light-blue': '#F8FAFC',
        'bg-green': '#F0FDF4',
        'txt-green': '#24D164',
        'bg-red': '#FDF2F8',
        'txt-red': '#ED4F9D',
        blue: '#2563EB',
        cyan: '#25DFEB',
        purple: '#B586F1',
        red: '#EB2555',
        lemon: '#D8DB4C',
        grey: '#64748B',
      },
    },
  },
  plugins: [],
};
export default config;
