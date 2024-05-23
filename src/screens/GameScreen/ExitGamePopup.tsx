import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/store';

import { SCREEN } from '../../constants/screen.constant';

import { closePopup, switchScreen } from '../../redux/slices/displaySlice';
import { clearCurrentStage } from '../../redux/slices/stageSlice';

import BackgroundLayer from '../../components/BackgroundLayer';
import PopupBox from '../../components/PopupBox';
import TextButton from '../../components/TextButton';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 30px 40px 35px;
`;

const Title = styled.h1`
	position: relative;
	z-index: 9;
	margin-bottom: 30px;

	font-style: italic;
	color: var(--main-color-yellow);
	-webkit-text-stroke: 1px #333;
	font-size: 2em;
	font-family: var(--main-font);
	letter-spacing: 3px;
	text-align: center;

	&::after {
		position: absolute;
		top: 2px;
		left: 50%;
		z-index: -1;
		transform: translateX(calc(-50% + 2px));
		content: attr(data-text);
		display: inline-block;
		width: 100%;
		clear: both;

		color: var(--sub-color-purple);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}
`;

const Text = styled.h2`
	text-align: center;
	margin-bottom: 30px;

	text-transform: uppercase;
	font-size: 1.4em;
	font-family: var(--main-font);
	color: var(--sub-color-pink);
	letter-spacing: 2px;
	line-height: 1.5;
	-webkit-text-stroke: 1px #666;
	text-shadow: 1px 1px 0px #666;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 5px;

	button {
		max-width: 200px;
		margin: 0px 10px;
	}
`;

function ExitGamePopup(): React.ReactElement {
	const dispatch = useAppDispatch();

	const removePopup = () => {
		dispatch(closePopup());
	};

	const moveToHome = () => {
		removePopup();
		dispatch(clearCurrentStage());
		dispatch(switchScreen(SCREEN.HOME));
	};

	return (
		<BackgroundLayer opacity={0.8}>
			<PopupBox>
				<Container>
					<Title data-text="Exit Game">
						<span>Exit Game</span>
					</Title>
					<Text>Quit game and move to home?</Text>
					<ButtonContainer>
						<TextButton handleClick={moveToHome}>YES</TextButton>
						<TextButton handleClick={removePopup}>NO</TextButton>
					</ButtonContainer>
				</Container>
			</PopupBox>
		</BackgroundLayer>
	);
}

export default ExitGamePopup;
