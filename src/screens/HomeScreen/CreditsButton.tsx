import React from 'react';
import { useDispatch } from 'react-redux';

import { POPUP } from '../../constants/screen.constant';

import { openPopup } from '../../redux/slices/displaySlice';

import TextButton from '../../components/TextButton';

function CreditsButton(): React.ReactElement {
	const dispatch = useDispatch();

	const openCreditsPopup = () => {
		dispatch(openPopup(POPUP.CREDITS));
	};

	return <TextButton handleClick={openCreditsPopup}>Credits</TextButton>;
}

export default CreditsButton;
