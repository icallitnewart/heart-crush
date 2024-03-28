import React, { useContext } from 'react';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { OPEN_POPUP } from '../../constants/gameSettingsActions.constant';
import { POPUP } from '../../constants/screen.constant';

import TextButton from '../../components/TextButton';

function CreditsButton(): React.ReactElement {
	const { dispatchGameSettings } = useContext(GameSettingsContext);

	const openCreditsPopup = () => {
		dispatchGameSettings({ type: OPEN_POPUP, popup: POPUP.CREDITS });
	};

	return <TextButton handleClick={openCreditsPopup}>Credits</TextButton>;
}

export default CreditsButton;
