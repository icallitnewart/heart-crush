import { PLAYING, STANDBY } from '../constants/status.contsant';

export type Status = typeof PLAYING | typeof STANDBY;

export type SwitchStatusFunction = (newStatus: Status) => void;
