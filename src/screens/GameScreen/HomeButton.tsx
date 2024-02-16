import React from 'react';
import { BiSolidHomeHeart } from 'react-icons/bi';

import IconButton from '../../components/IconButton';

function HomeButton(): React.ReactElement {
	return (
		<IconButton iconSize={24}>
			<BiSolidHomeHeart />
		</IconButton>
	);
}

export default HomeButton;
