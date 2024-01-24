import { HeartInfoType } from './common.type';

export type CellType = HeartInfoType;

export interface CellPositionType {
	columnIndex: number;
	cellIndex: number;
}

export interface CellInfoType extends CellType {
	position: CellPositionType;
}

export interface ColumnType {
	id: string;
	cells: CellType[];
}

export type BoardType = ColumnType[];
