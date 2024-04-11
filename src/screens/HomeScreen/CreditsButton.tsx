import React from 'react';
import { useAppDispatch } from '../../redux/store';

import { POPUP } from '../../constants/screen.constant';

import { openPopup } from '../../redux/slices/displaySlice';

import TextButton from '../../components/TextButton';

function CreditsButton(): React.ReactElement {
	const dispatch = useAppDispatch();

	const openCreditsPopup = () => {
		dispatch(openPopup(POPUP.CREDITS));
	};

	return <TextButton handleClick={openCreditsPopup}>Credits</TextButton>;
}

export default CreditsButton;
