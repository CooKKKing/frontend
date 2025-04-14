/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#F86401',
          light: '#FDF5F1',
        },
        green: {
          DEFAULT: '#02A231',
          light: 'rgba(2, 162, 49, 0.1)', 
        },
        disabled:{
          DEFAULT: '#A9A9A9', 
          light: '#EEEEEE',  
        },
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(90deg, rgba(248,100,1,0.5) 0%, rgba(248,100,1,0.8) 53%, rgba(248,100,1,1) 100%)',
        'green-gradient': 'linear-gradient(90deg, rgba(2,162,49,0.1) 0%, rgba(2,162,49,0.5) 50%, rgba(2,162,49,1) 100%)',
      },
    },
  },
  plugins: [],
}
