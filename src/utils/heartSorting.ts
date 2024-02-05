import { CellInfoType } from '../types/board.type';

export function categoriseHeartsByColumn(
	hearts: CellInfoType[],
): Record<number, CellInfoType[]> {
	return hearts.reduce(
		(acc, heart) => {
			const { columnIndex } = heart.position;

			if (!acc[columnIndex]) acc[columnIndex] = [];
			acc[columnIndex].push(heart);

			return acc;
		},
		{} as Record<number, CellInfoType[]>,
	);
}
