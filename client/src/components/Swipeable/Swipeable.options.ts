import { TouchStateType } from "./Swipeable.types";

export const touchInitialState: TouchStateType = Object.freeze({
  startX: null,
  startY: null,
  x: null,
  y: null,
  initTimeStamp: null,
  swipeDirectionAxis: null,
});
