import moment from "moment-timezone";

export type State = typeof initialState;

export type Action<T> = {
  type: string;
  payload?: T;
};

enum ActionTypes {
  CLOCK_IN = "CLOCK_IN",
  STOP_CLOCK_IN = "STOP_CLOCK_IN",
  ON_SET_REAL_TIME = "ON_SET_REAL_TIME",
}

const initialState = {
  isClockingIn: false,
  clickedTime: "",
  realTime: "",
};

function timeReducer(state: State, action: Action<string>): State {
  switch (action.type) {
    case ActionTypes.CLOCK_IN:
      return {
        ...state,
        isClockingIn: true,
        clickedTime: moment().format("HH:mm:ss"),
      };
    case ActionTypes.STOP_CLOCK_IN:
      return {
        ...state,
        isClockingIn: false,
      };
    case ActionTypes.ON_SET_REAL_TIME:
      return {
        ...state,
        realTime: action.payload as string,
      };
    default:
      throw new Error();
  }
}

export { initialState, timeReducer, ActionTypes };
