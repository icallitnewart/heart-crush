import { MAX_STAGE_NUMBER } from '../constants/stage.constant';

export function getMaxStageNumberInLocalStorage() {
	const storedItem = localStorage.getItem(MAX_STAGE_NUMBER);
	return storedItem ? parseInt(storedItem, 10) : null;
}

export function setMaxStageNumberInLocalStorage(stageNumber: number) {
	localStorage.setItem(MAX_STAGE_NUMBER, stageNumber.toString());
}
