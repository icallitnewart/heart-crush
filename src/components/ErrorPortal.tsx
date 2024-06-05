import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import {
	ErrorReasonType,
	ErrorType,
	ErrorTypeType,
} from '../types/common.type';
import {
	ERROR_TYPE_FOR_REASON,
	ERROR_REASON,
} from '../constants/error.constant';
import { IS_ENV_MODE } from '../constants/env.constant';

import ErrorNotification from './ErrorNotification';

interface ErrorPortalPropsType1 extends ErrorType {
	resetErrorBoundary: () => void;
	resetError?: undefined;
}

interface ErrorPortalPropsType2 extends ErrorType {
	resetError: () => void;
	resetErrorBoundary?: undefined;
}

function ErrorPortal({
	error,
	resetError,
	resetErrorBoundary,
}: ErrorPortalPropsType1 | ErrorPortalPropsType2): React.ReactElement | null {
	const [container, setContainer] = useState<HTMLElement | null>(null);
	const reason: ErrorReasonType =
		error.reason || ERROR_REASON.RENDERING_FAILURE;
	const type: ErrorTypeType = ERROR_TYPE_FOR_REASON[reason];
	const { message } = error;

	useEffect(() => {
		const containerEl = document.getElementById('screen-container');
		if (containerEl) setContainer(containerEl);
	}, []);

	useEffect(() => {
		if (IS_ENV_MODE.DEVELOPMENT) {
			console.error(
				`[Error Logging]\n type: ${type}\n reason: ${reason}\n message: ${message}`,
			);
		}
	}, [type, reason, message]);

	return (
		container &&
		createPortal(
			<ErrorNotification
				reason={reason}
				resetError={resetErrorBoundary || resetError}
			/>,
			container,
		)
	);
}

export default ErrorPortal;
