import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { GameSettingsContext } from '../states/GameSettingsContext';
import { STAGE_FILES } from '../constants/stage.constant';

function useStageConfig() {
	const { selectedStage } = useContext(GameSettingsContext);
	const [stageConfig, setStageConfig] = useState(null);

	useEffect(() => {
		const fetchStageConfig = async () => {
			try {
				if (!selectedStage)
					throw new Error('selectedStage 정보가 존재하지 않습니다.');

				const filePath = STAGE_FILES[selectedStage.stageNumber];
				const response = await axios.get(filePath);

				setStageConfig(response.data);
			} catch (error) {
				// TODO: 사용자에게 에러 발생을 알려주는 에러 메시지 UI 필요
				console.error(error);
			}
		};

		fetchStageConfig();
	}, [selectedStage]);

	return stageConfig;
}

export default useStageConfig;
