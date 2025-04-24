export type SwipeableProps = React.PropsWithChildren<{
  className?: string;
  swipingLeftBgContent?: JSX.Element;
  swipingRightBgContent?: JSX.Element;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}>;

export type TouchStateType = {
  startX: number | null;
  startY: number | null;
  x: number | null;
  y: number | null;
  initTimeStamp: number | null;
  swipeDirectionAxis: "x" | "y" | null;
};
