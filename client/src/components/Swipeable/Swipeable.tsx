import { SwipeableProps } from "./Swipeable.types";
import { useSwipeable } from "./Swipeable.helper";
import "./Swipeable.css";

function Swipeable({
  children,
  className,
  swipingLeftBgContent,
  swipingRightBgContent,
  onSwipeLeft,
  onSwipeRight,
}: SwipeableProps) {
  const {
    swipeableContainerRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSwipeable({ onSwipeLeft, onSwipeRight });

  return (
    <div
      className={`w-full overflow-x-hidden relative transition-all ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        id="swipe-content-right"
        className="absolute top-0 left-0 w-full h-full opacity-0 overflow-hidden"
      >
        {swipingRightBgContent}
      </div>
      <div
        id="swipe-content-left"
        className="absolute top-0 left-0 w-full h-full opacity-0 overflow-hidden"
      >
        {swipingLeftBgContent}
      </div>
      <div ref={swipeableContainerRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default Swipeable;
