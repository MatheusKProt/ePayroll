import { theme, DefaultTheme } from '@chakra-ui/core'

const customTheme: DefaultTheme = {
	...theme,
	fonts: {
		body: 'Roboto, system-ui, sans-serif',
		heading: 'Roboto, system-ui, sans-serif',
		mono: 'Menlo, monospace'
	},
	fontWeights: {
		...theme.fontWeights,
		normal: 400,
		medium: 600,
		bold: 700
	},
	radii: {
		...theme.radii,
		sm: '5px',
		md: '8px'
	},
	colors: {
		...theme.colors,
		gray: {
			...theme.colors.gray,
			300: '#bbbbbb',
			600: '#252525',
			800: '#181818'
		}
	}
}

export default customTheme