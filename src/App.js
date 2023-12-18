import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
// style + assets
import './styles/index.css';
import Router from './Router';

// recoil
import { RecoilRoot } from 'recoil';

function App() {
	const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██

  `;

	console.info(`%c${charAt}`, 'color: #5BE49B');

	return (
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Router />
			</ThemeProvider>
		</RecoilRoot>
	);
}

export default App;
