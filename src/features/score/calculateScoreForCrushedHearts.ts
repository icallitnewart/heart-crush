import { SCORE_PER_CRUSHED_HEART } from '../../constants/score.constant';
import { CrushedHeartsType } from '../../types/heart.type';

function calculateScoreForCrushedHearts(
	prevScore: number,
	crushedHearts: CrushedHeartsType,
): number {
	const scorePerEach = SCORE_PER_CRUSHED_HEART;
	const numOfHearts = crushedHearts.length;

	return prevScore + scorePerEach * numOfHearts;
}

export default calculateScoreForCrushedHearts;
