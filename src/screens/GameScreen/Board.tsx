import React, { useRef, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

import Column from './Column';

const Container = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-grow: 1;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 480px;
	padding: 12px;

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

interface GameBoardStyleProps {
	$gameBoardHeight: number;
}

const GameBoard = styled.ul<GameBoardStyleProps>`
	position: relative;
	display: flex;
	width: 100%;
	height: ${props =>
		props.$gameBoardHeight
			? `calc(${props.$gameBoardHeight}px + 5px)`
			: '100%'};
	padding: 0px 5px;
	overflow: hidden;

	background-color: #f9f3cf;
	border: 1px solid #888;
	border-radius: 5px;
	box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

function Board() {
	const [gameBoardHeight, setGameBoardHeight] = useState<number>(0);
	const columnRef = useRef<HTMLLIElement>(null);

	useLayoutEffect(() => {
		if (columnRef.current) {
			const columnHeight = columnRef.current.offsetHeight;
			setGameBoardHeight(columnHeight / 2);
		}
	}, [columnRef]);

	return (
		<Container>
			<Wrapper>
				<GameBoard $gameBoardHeight={gameBoardHeight}>
					{new Array(8).fill(0).map(_ => (
						// 추후 key값 추가 예정
						<Column ref={columnRef} />
					))}
				</GameBoard>
			</Wrapper>
		</Container>
	);
}

export default Board;
