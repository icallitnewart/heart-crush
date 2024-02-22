import {
	getMaxStageNumberInLocalStorage,
	setMaxStageNumberInLocalStorage,
} from '../../utils/stageStorage';

function getMaxStageNumber() {
	let maxStageNumber = getMaxStageNumberInLocalStorage();

	if (!maxStageNumber) {
		const stage1 = 1;
		setMaxStageNumberInLocalStorage(stage1);
		maxStageNumber = stage1;
	}

	return maxStageNumber;
}

export default getMaxStageNumber;
