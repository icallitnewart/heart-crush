import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { GameSettingsContext } from '../states/GameSettingsContext';

function useStageConfig() {
	const { selectedStageNumber } = useContext(GameSettingsContext);
	const [stageConfig, setStageConfig] = useState(null);

	useEffect(() => {
		const fetchStageConfig = async () => {
			try {
				if (!selectedStageNumber)
					throw new Error('selectedStageNumber 정보가 존재하지 않습니다.');
				const response = await axios.get(
					`${process.env.PUBLIC_URL}/assets/stages/stage${selectedStageNumber}.json`,
				);

				setStageConfig(response.data);
			} catch (error) {
				// TODO: 사용자에게 에러 발생을 알려주는 에러 메시지 UI 필요
				console.error(error);
			}
		};

		fetchStageConfig();
	}, [selectedStageNumber]);

	return stageConfig;
}

export default useStageConfig;
