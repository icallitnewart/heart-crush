import React from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';

import { closePopup } from '../../redux/slices/displaySlice';

const Button = styled.button`
	position: absolute;
	top: -30px;
	right: -30px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 45px;
	height: 45px;
	cursor: pointer;

	border-radius: 50%;
	border: none;
	background-color: #444;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);

	svg {
		font-size: 1.5em;
		color: var(--sub-color-purple);
	}
`;

function CloseButton(): React.ReactElement {
	const dispatch = useDispatch();

	const removePopup = () => {
		dispatch(closePopup());
	};

	return (
		<Button onClick={removePopup}>
			<IoClose />
		</Button>
	);
}

export default CloseButton;
