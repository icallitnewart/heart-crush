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

const STAGE_NUMBERS = Object.keys(STAGE_FILES).map(
	Number,
) as (keyof typeof STAGE_FILES)[];
export const FIRST_STAGE = STAGE_NUMBERS[0];
export const LAST_STAGE = STAGE_NUMBERS[STAGE_NUMBERS.length - 1];
