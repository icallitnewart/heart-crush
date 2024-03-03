import React, { useState } from 'react';
import styled from 'styled-components';

import BackgroundLayer from '../../components/BackgroundLayer';
import PopupBox from '../../components/PopupBox';
import StageList from './StageList';
import AlertMessage from './AlertMessage';
import CloseButton from './CloseButton';

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	padding: 25px 20px;
`;

const TextBox = styled.h1`
	margin-bottom: 30px;
	text-align: center;

	color: var(--sub-color-pink);
	-webkit-text-stroke: 1.3px #666;
	font-family: var(--main-font);
	font-size: 2em;
	letter-spacing: 2px;
	text-shadow: 2px 1px 0px #666;
`;

function StagePopup(): React.ReactElement {
	const [alertMessage, setAlertMessage] = useState(false);

	return (
		<BackgroundLayer>
			<PopupBox>
				<Container>
					<TextBox>Choose Stage</TextBox>
					<StageList
						createAlertMessage={() => setAlertMessage(true)}
						removeAlertMessage={() => setAlertMessage(false)}
					/>
					{alertMessage && <AlertMessage />}
					<CloseButton />
				</Container>
			</PopupBox>
		</BackgroundLayer>
	);
}

export default StagePopup;
