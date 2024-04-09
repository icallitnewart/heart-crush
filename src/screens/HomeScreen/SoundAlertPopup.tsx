import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { closePopup } from '../../redux/slices/displaySlice';
import { activateSound } from '../../redux/slices/soundSlice';

import BackgroundLayer from '../../components/BackgroundLayer';
import PopupBox from '../../components/PopupBox';
import TextButton from '../../components/TextButton';

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 30px;
`;

const Title = styled.h1`
	position: relative;
	z-index: 9;
	margin-bottom: 25px;

	color: var(--sub-color-purple);
	-webkit-text-stroke: 1px #333;
	font-size: 2.5em;
	font-family: var(--main-font);
	letter-spacing: 3px;
	text-align: center;

	&::after {
		position: absolute;
		top: 2px;
		left: 50%;
		z-index: -1;
		transform: translateX(calc(-50% + 2px));
		content: 'Warning';
		display: inline-block;
		width: 100%;
		clear: both;

		color: var(--sub-color-pink);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}
`;

const Text = styled.p`
	margin-bottom: 25px;
	line-height: 1.6;
	font-size: 1.3em;
	letter-spacing: 2px;
	text-align: center;
	text-transform: uppercase;

	font-family: var(--main-font);
	color: var(--main-color-yellow);
	-webkit-text-stroke: 0.8px #333;
	text-shadow: 1px 1px 0px #555;
`;

const ButtonBox = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 10px;

	button {
		padding: 0px 50px;
		flex-grow: 0;
	}
`;

function SoundAlertPopup() {
	const dispatch = useDispatch();

	const confirmToPlayAudio = () => {
		dispatch(activateSound());
		dispatch(closePopup());
	};

	return (
		<BackgroundLayer>
			<PopupBox>
				<Container>
					<Title>Warning</Title>
					<Text>This game plays music and sound effect.</Text>
					<ButtonBox>
						<TextButton handleClick={confirmToPlayAudio}>OK</TextButton>
					</ButtonBox>
				</Container>
			</PopupBox>
		</BackgroundLayer>
	);
}

export default SoundAlertPopup;
