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
		themes: [
			{
				mytheme: {
					primary: '#FF9501',
					'primary-focus': '#4506cb',
					'primary-content': '#ffffff'
					// secondary: '#f000b8',
					// 'secondary-focus': '#bd0091',
					// 'secondary-content': '#ffffff',
					// accent: '#37cdbe',
					// 'accent-focus': '#2aa79b',
					// 'accent-content': '#ffffff',
					// neutral: '#3d4451',
					// 'neutral-focus': '#2a2e37',
					// 'neutral-content': '#ffffff',
					// 'base-100': '#ffffff',
					// 'base-200': '#f9fafb',
					// 'base-300': '#d1d5db',
					// 'base-content': '#1f2937',
					// info: '#2094f3',
					// success: '#009485',
					// warning: '#ff9900',
					// error: '#ff5724'
				}
			}
		]
	}
};
