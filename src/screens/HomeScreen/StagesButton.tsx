import React, { useContext } from 'react';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { OPEN_POPUP } from '../../constants/gameSettingsActions.constant';
import { POPUP } from '../../constants/screen.constant';

import TextButton from '../../components/TextButton';

function StagesButton(): React.ReactElement {
	const { dispatchGameSettings } = useContext(GameSettingsContext);

	const openStagePopup = () => {
		dispatchGameSettings({ type: OPEN_POPUP, popup: POPUP.STAGE });
	};

	return <TextButton handleClick={openStagePopup}>Stages</TextButton>;
}

export default StagesButton;
