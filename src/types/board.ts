import { HeartType } from './heart';

export interface CellType {
	id: string;
	heart: HeartType;
}

export interface ColumnType {
	id: string;
	cells: CellType[];
}

export type BoardType = ColumnType[];
