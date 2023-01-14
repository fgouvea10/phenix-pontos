export type Action<T> = {
  type: string;
  payload?: T;
};

export enum ActionTypes {
  CLOCK_IN = "CLOCK_IN",
  STOP_CLOCK_IN = "STOP_CLOCK_IN",
  ON_SET_REAL_TIME = "ON_SET_REAL_TIME",
}
