import { useRef, useState } from "react";

type SwipeableStateType = {
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
  x: number | null;
  y: number | null;
  initTimeStamp: number | null;
};

const swipeableInitialState: SwipeableStateType = {
  startX: null,
  startY: null,
  endX: null,
  endY: null,
  x: null,
  y: null,
  initTimeStamp: null,
};

function Swipeable() {
  const swipeableContainerRef = useRef<HTMLDivElement | null>(null);
  const [touchState, setTouchState] = useState<SwipeableStateType>(swipeableInitialState);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    event.stopPropagation();

    const { clientX: touchX, clientY: touchY } = event.touches[0];
    setSwipeDirection(null);
    setTouchState({
      startX: touchX,
      startY: touchY,
      endX: null,
      endY: null,
      x: null,
      y: null,
      initTimeStamp: new Date().getTime(),
    });
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    console.log("handleTouchMove");
    event.stopPropagation();

    const { clientX: touchX, clientY: touchY } = event.touches[0];
    setTouchState((prevState) => ({
      ...prevState,
      x: touchX,
      y: touchY,
    }));
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    event.stopPropagation();

    const endX = touchState.x || null;
    const endY = touchState.y || null;
    setTouchState((prevState) => ({
      ...prevState,
      endX,
      endY,
    }));

    if (!endX) return;

    if (
      (touchState.startX && endX && Math.abs(touchState?.startX - endX) > 200) ||
      new Date().getTime() - (touchState.initTimeStamp || 0) < 300
    ) {
      const diffX = touchState.startX! - endX;
      if (diffX > 0) {
        setSwipeDirection("left");
      } else {
        setSwipeDirection("right");
      }

      setTimeout(() => {
        setTouchState(swipeableInitialState);
        setSwipeDirection(null);
      }, 500);
    } else {
      setTouchState(swipeableInitialState);
      setSwipeDirection(null);
    }
  };

  let transformX =
    swipeDirection === "left"
      ? -(swipeableContainerRef.current?.offsetWidth || window.innerWidth)
      : swipeDirection === "right"
      ? swipeableContainerRef.current?.offsetWidth || window.innerWidth
      : null;

  if (!transformX && touchState.startX !== null && touchState.x) {
    transformX = (touchState?.endX || touchState?.x || 0) - touchState.startX;
  } else if (!transformX) {
    transformX = 0;
  }

  console.log("transformX", transformX);
  console.log("swipeDirection", swipeDirection);

  return (
    <div
      className="mt-8 bg-gray-200 w-full overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={swipeableContainerRef}
    >
      <div className={`px-4 py-6 bg-sky-300 transition-transform`} style={{ transform: `translateX(${transformX}px)` }}>
        Scrollable content
      </div>
    </div>
  );
}

export default Swipeable;
