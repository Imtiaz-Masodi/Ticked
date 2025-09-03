import React, { useState, useRef, useEffect } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipSize = "sm" | "md";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  size?: TooltipSize;
  disabled?: boolean;
  delay?: number;
  className?: string;
}

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
};

const placementStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles = {
  top: "top-full left-1/2 -translate-x-1/2 -mt-px border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 mt-px border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent",
  left: "left-full top-1/2 -translate-y-1/2 -ml-px border-t-[7px] border-b-[7px] border-l-[7px] border-t-transparent border-b-transparent",
  right: "right-full top-1/2 -translate-y-1/2 ml-px border-t-[7px] border-b-[7px] border-r-[7px] border-t-transparent border-b-transparent",
};

const arrowBorderStyles = {
  top: "top-full left-1/2 -translate-x-1/2 border-l-[9px] border-r-[9px] border-t-[9px] border-l-transparent border-r-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-[9px] border-r-[9px] border-b-[9px] border-l-transparent border-r-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-t-[9px] border-b-[9px] border-l-[9px] border-t-transparent border-b-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-t-[9px] border-b-[9px] border-r-[9px] border-t-transparent border-b-transparent",
};

const getArrowColor = (placement: TooltipPlacement) => {
  const colorMap = {
    top: "border-t-white/90 dark:border-t-gray-900/90",
    bottom: "border-b-white/90 dark:border-b-gray-900/90",
    left: "border-l-white/90 dark:border-l-gray-900/90",
    right: "border-r-white/90 dark:border-r-gray-900/90",
  };
  return colorMap[placement];
};

const getArrowBorderColor = (placement: TooltipPlacement) => {
  const colorMap = {
    top: "border-t-gray-200/50 dark:border-t-gray-700/50",
    bottom: "border-b-gray-200/50 dark:border-b-gray-700/50",
    left: "border-l-gray-200/50 dark:border-l-gray-700/50",
    right: "border-r-gray-200/50 dark:border-r-gray-700/50",
  };
  return colorMap[placement];
};

function Tooltip({
  children,
  content,
  placement = "top",
  size = "md",
  disabled = false,
  delay = 200,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (disabled) return;

    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowTooltip(false);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!content || disabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div
          className={`
            absolute z-50 whitespace-nowrap rounded-md border select-none
            transition-opacity duration-200 pointer-events-none
            bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-sm
            ${placementStyles[placement]}
            ${sizeStyles[size]}
            ${showTooltip ? "opacity-100" : "opacity-0"}
          `}
          role="tooltip"
        >
          {content}

          {/* Arrow Border */}
          <div className={` absolute ${arrowBorderStyles[placement]} ${getArrowBorderColor(placement)}`} />

          {/* Arrow */}
          <div className={`absolute ${arrowStyles[placement]} ${getArrowColor(placement)}`} />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
