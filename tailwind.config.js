const { dark } = require('@mui/material/styles/createPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			margin: {
				'12px': '12px',
				'32px': '32px'
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: dark, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root' // The element that receives theme color CSS variables
	}

	// daisyui: {
	// 	themes: [
	// 		{
	// 			mytheme: {
	// 				primary: '#FF9501',
	// 				'primary-focus': '#4506cb',
	// 				'primary-content': '#ffffff'
	// 				// secondary: '#f000b8',
	// 				// 'secondary-focus': '#bd0091',
	// 				// 'secondary-content': '#ffffff',
	// 				// accent: '#37cdbe',
	// 				// 'accent-focus': '#2aa79b',
	// 				// 'accent-content': '#ffffff',
	// 				// neutral: '#3d4451',
	// 				// 'neutral-focus': '#2a2e37',
	// 				// 'neutral-content': '#ffffff',
	// 				// 'base-100': '#ffffff',
	// 				// 'base-200': '#f9fafb',
	// 				// 'base-300': '#d1d5db',
	// 				// 'base-content': '#1f2937',
	// 				// info: '#2094f3',
	// 				// success: '#009485',
	// 				// warning: '#ff9900',
	// 				// error: '#ff5724'
	// 			}
	// 		}
	// 	]
	// }
};
