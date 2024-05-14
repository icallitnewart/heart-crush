import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorPortal from './ErrorPortal';

function ErrorBoundaryHandler({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorPortal}
			onReset={() => window.location.reload()}
		>
			{children}
		</ErrorBoundary>
	);
}

export default ErrorBoundaryHandler;
