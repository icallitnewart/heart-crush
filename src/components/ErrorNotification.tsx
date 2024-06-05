import React from 'react';
import { styled } from 'styled-components';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { useAppDispatch } from '../redux/store';

import { ErrorReasonType } from '../types/common.type';
import { ERROR_REASON } from '../constants/error.constant';
import { SCREEN } from '../constants/screen.constant';

import { switchScreen } from '../redux/slices/displaySlice';

import BackgroundLayer from './BackgroundLayer';
import PopupBox from './PopupBox';
import TextButton from './TextButton';

const Container = styled.div`
	width: 100%;
	padding: 30px 5vw;
`;

const ErrorIcon = styled.div`
	width: 100%;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;

	svg {
		font-size: 4em;
		color: var(--sub-color-blue);
		filter: drop-shadow(1px 1px 0px #666);

		path {
			stroke: #666;
			stroke-width: 0.4;
		}
	}
`;

const Description = styled.p`
	margin-bottom: 25px;
	font-family: var(--main-font);
	font-size: 1.5em;
	line-height: 1.4;
	text-align: center;
	text-decoration: uppercase;
	color: #fded90;
	letter-spacing: 1px;
	-webkit-text-stroke: 1px #333;
	text-shadow: 1px 0px 0px #333;
`;

const ButtonBox = styled.div`
	width: 100%;
	text-align: center;
	margin-bottom: 10px;

	button {
		padding-left: 20px;
		padding-right: 20px;
	}
`;

interface ErrorNotificationPropsType {
	reason: ErrorReasonType;
	resetError: () => void;
}

function ErrorNotification({
	reason,
	resetError,
}: ErrorNotificationPropsType): React.ReactElement {
	const dispatch = useAppDispatch();

	const btnFunc = {
		moveToHome: () => {
			dispatch(switchScreen(SCREEN.HOME));
		},
		reload: () => {
			window.location.reload();
		},
	};

	const resolveError = (next?: () => void) => {
		if (next) next();
		resetError();
	};

	const errorInfo: {
		[reason in ErrorReasonType]: {
			message: string;
			button: {
				function: (action?: () => void) => void;
				text: string;
			};
		};
	} = {
		[ERROR_REASON.RENDERING_FAILURE]: {
			message: 'Oops! Something went wrong. App needs to be reloaded.',
			button: {
				function: resolveError,
				text: 'Reload',
			},
		},
		[ERROR_REASON.INVALID_STAGE_NUMBER]: {
			message: 'There was a problem loading the stage. Please try again.',
			button: {
				function: () => resolveError(btnFunc.moveToHome),
				text: 'Go back',
			},
		},
		[ERROR_REASON.INVALID_GAME_DATA]: {
			message:
				'Sorry, game has stopped due to an unexpected error. Please restart the game.',
			button: {
				function: () => resolveError(btnFunc.moveToHome),
				text: 'Go back',
			},
		},
		[ERROR_REASON.STAGE_DATA_LOAD_FAILURE]: {
			message:
				'There was a network error while loading the stage. Please check your connection.',
			button: {
				function: () => resolveError(btnFunc.moveToHome),
				text: 'Go back',
			},
		},
	};

	return (
		<BackgroundLayer bgColor="186, 208, 239" opacity={1}>
			<PopupBox bgColor="var(--sub-color-lightpink)">
				<Container>
					<ErrorIcon>
						<BiSolidErrorAlt title="Error Icon" />
					</ErrorIcon>
					<Description>{errorInfo[reason].message}</Description>
					<ButtonBox>
						<TextButton handleClick={() => errorInfo[reason].button.function()}>
							{errorInfo[reason].button.text}
						</TextButton>
					</ButtonBox>
				</Container>
			</PopupBox>
		</BackgroundLayer>
	);
}

export default ErrorNotification;
