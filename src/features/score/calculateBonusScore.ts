import { ScoreType } from '../../types/state.type';
import { BONUS_SCORE_PER_MOVE } from '../../constants/score.constant';

function calculateBonusScore(score: ScoreType) {
	return score + BONUS_SCORE_PER_MOVE;
}

export default calculateBonusScore;
