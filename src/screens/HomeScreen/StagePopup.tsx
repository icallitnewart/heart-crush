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

	@media ${({ theme }) => theme.smallMobile} {
		padding: 25px 10px;
	}
`;

const Title = styled.h1`
	margin-bottom: 30px;
	text-align: center;

	color: var(--sub-color-pink);
	-webkit-text-stroke: 1.3px #666;
	font-family: var(--main-font);
	font-size: 2em;
	letter-spacing: 2px;
	text-shadow: 2px 1px 0px #666;
`;

const AlertBox = styled.div`
	width: 100%;
	height: 1.2em;
`;

function StagePopup(): React.ReactElement {
	const [alertMessage, setAlertMessage] = useState(false);

	return (
		<BackgroundLayer>
			<PopupBox>
				<Container>
					<Title>Choose Stage</Title>
					<StageList
						createAlertMessage={() => setAlertMessage(true)}
						removeAlertMessage={() => setAlertMessage(false)}
					/>
					<AlertBox>{alertMessage && <AlertMessage />}</AlertBox>
					<CloseButton />
				</Container>
			</PopupBox>
		</BackgroundLayer>
	);
}

export default StagePopup;
