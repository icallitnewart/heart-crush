import { FallingHeartsType } from '../../types/heart.type';

function pickMatchingCandidates(fallingHearts: FallingHeartsType) {
	const targetHearts = fallingHearts
		.filter(({ position }) => position.rowIndex >= 10)
		.map(({ distance, ...rest }) => rest);

	return targetHearts;
}

export default pickMatchingCandidates;
