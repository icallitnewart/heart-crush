import React from 'react';
import { useDispatch } from 'react-redux';

import { POPUP } from '../../constants/screen.constant';

import { openPopup } from '../../redux/slices/displaySlice';

import TextButton from '../../components/TextButton';

function StagesButton(): React.ReactElement {
	const dispatch = useDispatch();

	const openStagePopup = () => {
		dispatch(openPopup(POPUP.STAGE));
	};

	return <TextButton handleClick={openStagePopup}>Stages</TextButton>;
}

export default StagesButton;
