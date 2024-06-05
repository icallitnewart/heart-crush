import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './GlobalStyles';

const screenSize = {
	desktop: 1024,
	mobile: 576,
	smallMobile: 375,
};

const theme = {
	desktop: `(min-width: ${screenSize.desktop}px)`,
	tablet: `(min-width: ${screenSize.mobile + 1}px) and (max-width: ${
		screenSize.desktop - 1
	}px)`,
	mobile: `(max-width: ${screenSize.mobile}px)`,
	smallMobile: `(max-width: ${screenSize.smallMobile}px)`,
};

function StyleProvider({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	);
}

export default StyleProvider;
