import React, { useState, useRef, useEffect } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipVariant = "dark" | "light";
export type TooltipSize = "sm" | "md";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  variant?: TooltipVariant;
  size?: TooltipSize;
  disabled?: boolean;
  delay?: number;
  className?: string;
}

const variantStyles = {
  dark: "bg-gray-900/90 text-white border-gray-700/50 backdrop-blur-sm",
  light:
    "bg-white/90 text-gray-900 border-gray-200/50 shadow-lg backdrop-blur-sm",
};

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
  top: "top-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent",
  right:
    "right-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent",
};

const getArrowColor = (
  variant: TooltipVariant,
  placement: TooltipPlacement
) => {
  const colorMap = {
    dark: {
      top: "border-t-gray-900/90",
      bottom: "border-b-gray-900/90",
      left: "border-l-gray-900/90",
      right: "border-r-gray-900/90",
    },
    light: {
      top: "border-t-white/90",
      bottom: "border-b-white/90",
      left: "border-l-white/90",
      right: "border-r-white/90",
    },
  };
  return colorMap[variant][placement];
};

function Tooltip({
  children,
  content,
  placement = "top",
  variant = "dark",
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
            absolute z-50 whitespace-nowrap rounded-md border
            transition-opacity duration-200 pointer-events-none
            ${placementStyles[placement]}
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${showTooltip ? "opacity-100" : "opacity-0"}
          `}
          role="tooltip"
        >
          {content}

          {/* Arrow */}
          <div
            className={`
              absolute
              ${arrowStyles[placement]}
              ${getArrowColor(variant, placement)}
            `}
          />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
