import React from 'react';

import TextButton from '../../components/TextButton';

interface StagesButtonPropsType {
	handleClick: () => void;
}

function StagesButton({
	handleClick,
}: StagesButtonPropsType): React.ReactElement {
	return <TextButton handleClick={handleClick}>Stages</TextButton>;
}

export default StagesButton;
