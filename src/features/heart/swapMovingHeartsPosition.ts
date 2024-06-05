import { MovingHeartsType } from '../../types/heart.type';

function swapMovingHeartsPosition(movingHearts: MovingHeartsType) {
	const newMovingHearts: MovingHeartsType = Object.keys(movingHearts).reduce(
		(acc, key) => {
			acc[key] = { ...movingHearts[key] };
			return acc;
		},
		{} as MovingHeartsType,
	);
	const [first, second] = Object.keys(newMovingHearts);

	newMovingHearts[first].position = movingHearts[second].position;
	newMovingHearts[second].position = movingHearts[first].position;

	return newMovingHearts;
}

export default swapMovingHeartsPosition;
