import { MovingHeartsType } from '../../types/heart.type';

function returnMovingHearts(movingHearts: MovingHeartsType) {
	const newMovingHearts = { ...movingHearts };
	const [first, second] = Object.keys(newMovingHearts);

	newMovingHearts[first].isReturning = true;
	newMovingHearts[second].isReturning = true;

	return newMovingHearts;
}

export default returnMovingHearts;
