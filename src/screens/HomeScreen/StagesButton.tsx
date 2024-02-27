import React from 'react';

import TextButton from '../../components/TextButton';

interface StagesButtonPropsType {
	openStagePopup: () => void;
}

function StagesButton({
	openStagePopup,
}: StagesButtonPropsType): React.ReactElement {
	return <TextButton handleClick={openStagePopup}>Stages</TextButton>;
}

export default StagesButton;
