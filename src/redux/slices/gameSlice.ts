import { createSlice } from '@reduxjs/toolkit';

import { GameSliceStateType } from '../../types/state.type';
import { CrushedHeartsType } from '../../types/heart.type';
import { ERROR_REASON, ERROR_SLICE } from '../../constants/error.constant';

import {
	initialiseBoard,
	rearrangeBoard as rearrangeAndUpdateBoard,
	validateBoard,
} from '../../features/board';
import {
	findMatchedHearts,
	getFallingHearts,
	pickMatchingCandidates,
	returnMovingHearts,
	simulateHeartSwap,
} from '../../features/heart';
import {
	calculateBonusScore,
	calculateScoreForCrushedHearts,
} from '../../features/score';
import { checkForWin } from '../../features/result';
import { getBoardSize } from '../../utils/boardSize';

const initialState: GameSliceStateType = {
	error: null,
	board: [],
	boardStatus: {
		isValid: null,
		validSwap: null,
	},
	score: 0,
	move: 0,
	goal: {},
	result: null,
	crushedHearts: [],
	fallingHearts: [],
	matchingCandidates: [],
	movingHearts: null,
	isSwipeEnabled: true,
	isBonusTime: false,
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setGameError: (state, action) => {
			const { reason, message } = action.payload;

			state.error = {
				reason,
				message,
				sliceName: ERROR_SLICE.GAME,
			};
		},
		clearGameError: state => {
			state.error = null;
		},
		// 게임 시작
		startGame: (state, action) => {
			const { columns, rows, move, goal } = action.payload;
			const { board, boardStatus } = initialiseBoard(columns, rows);

			if (!boardStatus.isValid) {
				state.error = {
					reason: ERROR_REASON.INVALID_GAME_DATA,
					message: 'Failed to produce a valid board.',
					sliceName: ERROR_SLICE.GAME,
				};
				return state;
			}

			return {
				...initialState,
				board,
				boardStatus,
				score: 0,
				move,
				goal,
			};
		},
		// 보드 초기화
		resetBoard: state => {
			const { rows, columns } = getBoardSize(state.board);
			const { board, boardStatus } = initialiseBoard(columns, rows);

			if (!boardStatus.isValid) {
				state.error = {
					reason: ERROR_REASON.INVALID_GAME_DATA,
					message: 'Failed to produce a valid board.',
					sliceName: ERROR_SLICE.GAME,
				};
				return;
			}

			state.board = board;
			state.boardStatus = boardStatus;
		},
		// 하트 이동 (스와이프로 인해 임시로 이동)
		moveHearts: (state, action) => {
			const movingHearts = action.payload;

			state.movingHearts = movingHearts;
		},
		// 하트 스왑 (보드에서 위치 교환)
		swapHearts: state => {
			const { movingHearts, board, score, move } = state;

			if (!movingHearts) {
				state.error = {
					reason: ERROR_REASON.INVALID_GAME_DATA,
					message: 'movingHearts is null or undefined.',
					sliceName: ERROR_SLICE.GAME,
				};
				return;
			}

			const { updatedBoard, crushedHearts, isSwapValid } = simulateHeartSwap(
				movingHearts,
				board,
			);

			// 하트 매칭 성공시
			if (isSwapValid) {
				state.board = updatedBoard;
				state.boardStatus.validSwap = null;
				state.move = move - 1;
				state.crushedHearts = crushedHearts;
				state.score = calculateScoreForCrushedHearts(score, crushedHearts);
				state.movingHearts = null;
				return;
			}

			// 하트 매칭 실패시
			state.movingHearts = returnMovingHearts(movingHearts);
			state.isSwipeEnabled = true;
		},
		// 하트 리턴 (원위치로 되돌리기)
		returnHearts: state => {
			state.movingHearts = null;
		},
		// 하트 드롭 (밑으로 떨어뜨리기)
		dropHearts: state => {
			const { board, crushedHearts } = state;

			state.fallingHearts = getFallingHearts(board, crushedHearts);
		},
		// 보드 재배치
		rearrangeBoard: state => {
			const { board, fallingHearts } = state;

			state.board = rearrangeAndUpdateBoard(board, fallingHearts);
			state.matchingCandidates = pickMatchingCandidates(fallingHearts);
			state.fallingHearts = [];
		},
		// 크러쉬 후 추가 하트 매칭 검사
		checkExtraMatchingHearts: state => {
			const { board, matchingCandidates, score, move, goal, result } = state;
			const crushedHearts: CrushedHeartsType = findMatchedHearts(
				board,
				matchingCandidates,
			);

			state.crushedHearts = crushedHearts;
			state.score = calculateScoreForCrushedHearts(score, crushedHearts);

			const isMoveFinished = crushedHearts.length === 0;
			if (isMoveFinished) {
				const newResult = checkForWin(score, goal, move);

				if (result !== newResult) {
					state.result = newResult;
					state.isSwipeEnabled = false;
				} else {
					state.boardStatus = validateBoard(board);
					state.isSwipeEnabled = true;
				}
			}
		},

		// 보너스 타임 시작
		startBonusTime: state => {
			state.isBonusTime = true;
		},
		// 보너스 타임 종료
		endBonusTime: state => {
			state.isBonusTime = false;
		},
		// 보너스 점수 추가
		addBonusScore: state => {
			const { move, score } = state;

			state.move = move - 1;
			state.score = calculateBonusScore(score);
		},
		// 스와이프 비활성화
		disableSwipe: state => {
			state.isSwipeEnabled = false;
		},
	},
});

export const {
	setGameError,
	clearGameError,
	startGame,
	resetBoard,
	moveHearts,
	swapHearts,
	returnHearts,
	dropHearts,
	rearrangeBoard,
	checkExtraMatchingHearts,
	startBonusTime,
	endBonusTime,
	addBonusScore,
	disableSwipe,
} = gameSlice.actions;

export default gameSlice.reducer;
