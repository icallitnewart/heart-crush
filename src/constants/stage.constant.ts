export const MAX_STAGE_NUMBER = 'maxStageNumber';
const STAGE_FOLDER = `${process.env.PUBLIC_URL}/assets/stages/`;
const getFilePath = (number: number) => `${STAGE_FOLDER}stage${number}.json`;

export const STAGE_FILES = {
	1: getFilePath(1),
	2: getFilePath(2),
	3: getFilePath(3),
	4: getFilePath(4),
	5: getFilePath(5),
	6: getFilePath(6),
	7: getFilePath(7),
	8: getFilePath(8),
	9: getFilePath(9),
	10: getFilePath(10),
};

export const LAST_STAGE = Object.keys(STAGE_FILES).length;
