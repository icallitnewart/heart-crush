import React, {
	useRef,
	useLayoutEffect,
	useState,
	useContext,
	useEffect,
} from 'react';
import styled from 'styled-components';

import { GamePlayContext } from '../../states/GamePlayContext';

import Column from './Column';
import {
	STOP_MOVING_HEARTS,
	SWAP_HEARTS,
} from '../../constants/gamePlay.constant';

const Container = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-grow: 1;
`;

interface WrapperStyleProps {
	$isBoardReady?: boolean;
}

const Wrapper = styled.div<WrapperStyleProps>`
	opacity: ${props => (props.$isBoardReady ? 1 : 0)};
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 480px;
	padding: 12px;
	transition: opacity 1s;

	background: repeating-linear-gradient(
		45deg,
		var(--main-color-yellow) 15px,
		#888 15px,
		var(--main-color-purple) 16px,
		var(--main-color-purple) 30px,
		#888 30px,
		var(--main-color-yellow) 31px,
		var(--main-color-yellow) 45px
	);
	border: 1px solid #888;
	border-radius: 5px;
	box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
`;

interface BoardBoxStyleProps {
	$boardBoxHeight: number;
}

const BoardBox = styled.ul<BoardBoxStyleProps>`
	position: relative;
	display: flex;
	width: 100%;
	height: ${props =>
		props.$boardBoxHeight > 0
			? `calc(${props.$boardBoxHeight}px + 5px)`
			: '100%'};
	padding: 0px 5px;
	overflow: hidden;

	background-color: #f9f3cf;
	border: 1px solid #888;
	border-radius: 5px;
	box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

function Board() {
	const isMountedRef = useRef(false);
	const { board, movingHearts, dispatch, settings } =
		useContext(GamePlayContext);
	const [boardBoxHeight, setBoardBoxHeight] = useState<number>(0);
	const columnRef = useRef<HTMLLIElement>(null);

	// 게임 보드 높이 설정
	useLayoutEffect(() => {
		if (!isMountedRef.current && board.length > 0 && columnRef.current) {
			const columnHeight = columnRef.current.offsetHeight;
			setBoardBoxHeight(columnHeight / 2);
			isMountedRef.current = true;
		}
	}, [isMountedRef, columnRef, board]);

	// 하트 이동 애니메이션 모션
	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;
		const animationDuration = settings.animationDuration.movingHearts;
		const isHeartsMoving =
			movingHearts && Object.keys(movingHearts).length === 2;

		if (isHeartsMoving) {
			animationTimer = setTimeout(() => {
				const [first, second] = Object.keys(movingHearts);
				if (
					movingHearts[first].isReturning &&
					movingHearts[second].isReturning
				) {
					dispatch({ type: STOP_MOVING_HEARTS });
				} else {
					dispatch({ type: SWAP_HEARTS });
				}
			}, animationDuration);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movingHearts, settings.animationDuration.movingHearts]);

	return (
		<Container>
			<Wrapper $isBoardReady={boardBoxHeight > 0}>
				<BoardBox $boardBoxHeight={boardBoxHeight}>
					{board.map((columnData, columnIndex) => (
						<Column
							key={columnData.id}
							ref={columnRef}
							columnData={columnData}
							columns={board.length}
							columnIndex={columnIndex}
						/>
					))}
				</BoardBox>
			</Wrapper>
		</Container>
	);
}

export default Board;
