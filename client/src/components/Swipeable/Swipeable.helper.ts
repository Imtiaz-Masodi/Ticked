import React from "react";
import { TouchStateType } from "./Swipeable.types";
import { touchInitialState } from "./Swipeable.options";

const handleTouchStart = (
  touchRef: React.MutableRefObject<TouchStateType>,
  swipingLeftAllowed: boolean,
  swipingRightAllowed: boolean
) => {
  return (event: React.TouchEvent) => {
    event.stopPropagation();
    document.body.style.overflow = "hidden";

    if (!swipingLeftAllowed && !swipingRightAllowed) return;

    const { clientX: touchX } = event.touches[0];
    touchRef.current = { ...touchInitialState };
    touchRef.current.startX = touchX;
    touchRef.current.initTimeStamp = new Date().getTime();
  };
};

const handleTouchMove = (
  touchRef: React.MutableRefObject<TouchStateType>,
  swipeableContainerRef: React.MutableRefObject<HTMLDivElement | null>,
  swipingLeftAllowed: boolean,
  swipingRightAllowed: boolean
) => {
  return (event: React.TouchEvent) => {
    event.stopPropagation();
    if (touchRef.current.startX === null) return;

    const { clientX: touchX } = event.touches[0];
    const transformX = touchX - touchRef.current.startX;

    // Below code is to show/hide the left/right side background content
    // based on the swipe direction
    if (transformX > 0 && swipingRightAllowed) {
      // Show swiping right side content
      swipeableContainerRef.current?.parentElement
        ?.querySelector("#swipe-content-right")
        ?.classList.remove("opacity-0");
      swipeableContainerRef.current?.parentElement?.querySelector("#swipe-content-left")?.classList.add("opacity-0");
    } else if (transformX < 0 && swipingLeftAllowed) {
      // Show swiping left side content
      swipeableContainerRef.current?.parentElement?.querySelector("#swipe-content-left")?.classList.remove("opacity-0");
      swipeableContainerRef.current?.parentElement?.querySelector("#swipe-content-right")?.classList.add("opacity-0");
    } else {
      return;
    }

    swipeableContainerRef.current?.style.setProperty("transform", `translateX(${transformX}px)`);
    touchRef.current.x = touchX;
  };
};

const handleTouchEnd = (
  touchRef: React.MutableRefObject<TouchStateType>,
  swipeableContainerRef: React.MutableRefObject<HTMLDivElement | null>,
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void
) => {
  return (event: React.TouchEvent) => {
    event.stopPropagation();
    document.body.style.overflow = "unset";

    const endX = touchRef.current.x || null;
    touchRef.current.endX = endX;

    if (!endX) return;

    swipeableContainerRef.current?.style.setProperty("transition", "transform 0.3s ease-in-out");
    if (
      (touchRef.current.startX && endX && Math.abs(touchRef.current?.startX - endX) > 300) ||
      new Date().getTime() - (touchRef.current.initTimeStamp || 0) < 300
    ) {
      const diffX = touchRef.current.startX! - endX;
      if (diffX > 0) {
        const transformX = -(swipeableContainerRef.current?.offsetWidth || window.innerWidth);
        swipeableContainerRef.current?.style.setProperty("transform", `translateX(${transformX}px)`);
        onSwipeLeft?.();
      } else {
        const transformX = swipeableContainerRef.current?.offsetWidth || window.innerWidth;
        swipeableContainerRef.current?.style.setProperty("transform", `translateX(${transformX}px)`);
        onSwipeRight?.();
      }

      // Setting the height of the parent element to a fixed value
      // to allow collapsing transition to happen smoothly
      const contentHeight = swipeableContainerRef.current?.parentElement?.offsetHeight || 0;
      swipeableContainerRef.current?.parentElement?.style.setProperty("height", `${contentHeight}px`);

      setTimeout(() => {
        touchRef.current = { ...touchInitialState };
        swipeableContainerRef.current?.parentElement?.style.setProperty("height", "0px");
      }, 500);
    } else {
      // If the swipe distance is less than 300px, reset the position
      touchRef.current = { ...touchInitialState };
      swipeableContainerRef.current?.style.setProperty("transform", "translateX(0px)");
    }

    // Resetting the transition property to none after the swipe
    // and hiding the left/right background content
    setTimeout(() => {
      swipeableContainerRef.current?.style.setProperty("transition", "none");
      swipeableContainerRef.current?.parentElement?.querySelector("#swipe-content-left")?.classList.add("opacity-0");
      swipeableContainerRef.current?.parentElement?.querySelector("#swipe-content-right")?.classList.add("opacity-0");
    }, 750);
  };
};

export const touchEventHandlers = {
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
};
