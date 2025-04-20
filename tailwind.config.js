/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        gmarket: ['GmarketSans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FFE6D1',
        },
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
        border:{
          DEFAULT: '#BBBBBB', 
          // light: '#EEEEEE',  
        },
      },
      backgroundImage: {
        'background-gradient': 'linear-gradient(157deg, rgba(252,245,241,1) 3%, rgba(255,255,255,1) 100%)',
        'orange-gradient': 'linear-gradient(135deg, rgba(248,100,1,1) 0%, rgba(248,100,1,0.8) 53%, rgba(248,100,1,0.5) 100%)',
        'green-gradient': 'linear-gradient(135deg, rgba(2,162,49,1) 0%, rgba(2,162,49,0.5) 70%, rgba(2,162,49,0.5) 100%)',
      },
      boxShadow: {
        'menu': '4px 0px 10px 0px rgba(0,0,0,0.1)', 
        'icon': '0px 0px 10px 0px rgba(0,0,0,0.2)', 
      },
    },
  },
  plugins: [],
}
 