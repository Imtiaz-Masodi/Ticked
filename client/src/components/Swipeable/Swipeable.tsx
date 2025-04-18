import { useRef } from "react";

type TouchStateType = {
  startX: number | null;
  endX: number | null;
  x: number | null;
  initTimeStamp: number | null;
};

const touchInitialState: TouchStateType = Object.freeze({
  startX: null,
  endX: null,
  x: null,
  initTimeStamp: null,
});

function Swipeable() {
  const touchRef = useRef<TouchStateType>(touchInitialState);
  const swipeableContainerRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    event.stopPropagation();

    const { clientX: touchX } = event.touches[0];
    touchRef.current = { ...touchInitialState };
    touchRef.current.startX = touchX;
    touchRef.current.initTimeStamp = new Date().getTime();
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    event.stopPropagation();
    if (touchRef.current.startX === null) return;

    const { clientX: touchX } = event.touches[0];
    const transformX = touchX - touchRef.current.startX;

    swipeableContainerRef.current?.style.setProperty("transform", `translateX(${transformX}px)`);
    touchRef.current.x = touchX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    event.stopPropagation();

    const endX = touchRef.current.x || null;
    touchRef.current.endX = endX;

    if (!endX) return;

    if (
      (touchRef.current.startX && endX && Math.abs(touchRef.current?.startX - endX) > 300) ||
      new Date().getTime() - (touchRef.current.initTimeStamp || 0) < 300
    ) {
      const diffX = touchRef.current.startX! - endX;
      if (diffX > 0) {
        const transformX = -(swipeableContainerRef.current?.offsetWidth || window.innerWidth);
        swipeableContainerRef.current?.style.setProperty("transform", `translateX(${transformX}px)`);
      } else {
        const transformX = swipeableContainerRef.current?.offsetWidth || window.innerWidth;
        swipeableContainerRef.current?.style.setProperty("transform", `translateX(${transformX}px)`);
      }

      setTimeout(() => {
        touchRef.current = { ...touchInitialState };
        swipeableContainerRef.current?.style.setProperty("transform", "translateX(0px)");
      }, 500);
    } else {
      touchRef.current = { ...touchInitialState };
      swipeableContainerRef.current?.style.setProperty("transform", "translateX(0px)");
    }
  };

  return (
    <div
      className="mt-8 bg-gray-200 w-full overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`px-4 py-6 bg-sky-300 transition-transform`} ref={swipeableContainerRef}>
        Scrollable content
      </div>
    </div>
  );
}

export default Swipeable;
