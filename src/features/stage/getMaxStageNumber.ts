import {
	getMaxStageNumberInLocalStorage,
	setMaxStageNumberInLocalStorage,
} from '../../utils/stageStorage';
import { isStageNumberValid } from '../../utils/typeValidation';

function getMaxStageNumber() {
	let maxStageNumber = getMaxStageNumberInLocalStorage();

	if (!maxStageNumber) {
		const stage1 = 1;
		setMaxStageNumberInLocalStorage(stage1);
		maxStageNumber = stage1;
	}

	if (!isStageNumberValid(maxStageNumber)) {
		throw new Error('유효하지 않은 maxStageNumber입니다.');
	}

	return maxStageNumber;
}

export default getMaxStageNumber;
