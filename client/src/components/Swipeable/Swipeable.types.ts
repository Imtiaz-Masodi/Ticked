export type SwipeableProps = React.PropsWithChildren<{
  className?: string;
  swipingLeftBgContent?: JSX.Element;
  swipingRightBgContent?: JSX.Element;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}>;

export type TouchStateType = {
  startX: number | null;
  endX: number | null;
  x: number | null;
  initTimeStamp: number | null;
};
