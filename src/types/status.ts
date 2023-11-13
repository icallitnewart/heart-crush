import { PLAYING, STANDBY } from '../constants/status';

export type Status = typeof PLAYING | typeof STANDBY;

export type SwitchStatusFunction = (newStatus: Status) => void;
