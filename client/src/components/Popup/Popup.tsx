import { useEffect, useRef } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  showArrow?: boolean;
}

function Popup({
  isOpen,
  onClose,
  children,
  triggerRef,
  className = "",
  position = "bottom",
  showArrow = true,
}: PopupProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-4 -left-4";
      case "bottom":
        return "top-full mt-4 -left-4";
      case "left":
        return "right-full mr-4 -top-4";
      case "right":
        return "left-full ml-4 -top-4";
      default:
        return "top-full mt-4 -left-4";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-4 transform -translate-y-[1px] border-l-[9px] border-r-[9px] border-t-[9px] border-l-transparent border-r-transparent border-t-white";
      case "bottom":
        return "bottom-full left-4 transform translate-y-[1px] border-l-[9px] border-r-[9px] border-b-[9px] border-l-transparent border-r-transparent border-b-white";
      case "left":
        return "left-full top-4 transform -translate-x-[1px] border-t-[9px] border-b-[9px] border-l-[9px] border-t-transparent border-b-transparent border-l-white";
      case "right":
        return "right-full top-4 transform translate-x-[1px] border-t-[9px] border-b-[9px] border-r-[9px] border-t-transparent border-b-transparent border-r-white";
      default:
        return "bottom-full left-4 transform translate-y-[1px] border-l-[9px] border-r-[9px] border-b-[9px] border-l-transparent border-r-transparent border-b-white";
    }
  };

  const getArrowBorderClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-4 transform border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-200";
      case "bottom":
        return "bottom-full left-4 transform border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-200";
      case "left":
        return "left-full top-4 transform border-t-[10px] border-b-[10px] border-l-[10px] border-t-transparent border-b-transparent border-l-gray-200";
      case "right":
        return "right-full top-4 transform border-t-[10px] border-b-[10px] border-r-[10px] border-t-transparent border-b-transparent border-r-gray-200";
      default:
        return "bottom-full left-4 transform border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-200";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={tooltipRef}
      className={`absolute z-50 ${getPositionClasses()} ${className}`}
    >
      <div className="relative">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-w-max">
          {children}
        </div>
        {showArrow && (
          <>
            {/* Arrow border (acts as shadow) */}
            <div className={`absolute w-0 h-0 ${getArrowBorderClasses()}`} />
            {/* Arrow fill */}
            <div className={`absolute w-0 h-0 ${getArrowClasses()}`} />
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
