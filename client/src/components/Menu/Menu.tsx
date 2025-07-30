import { useEffect, useRef } from "react";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

export interface MenuItem {
  menuId: string;
  label: string;
  icon: Icons;
  variant?: "default" | "danger";
  itemPayload?: object;
}

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick?: (menuId: string, itemPayload: object | null) => void;
  items: MenuItem[];
  triggerRef: React.RefObject<HTMLElement>;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

function Menu({
  isOpen,
  onClose,
  onMenuItemClick,
  items,
  triggerRef,
  className = "",
  position = "bottom",
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
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
        return "bottom-full mb-1 right-0";
      case "bottom":
        return "top-full mt-1 right-0";
      case "left":
        return "right-full mr-1 top-0";
      case "right":
        return "left-full ml-1 top-0";
      default:
        return "top-full mt-1 right-0";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute z-50 ${getPositionClasses()} ${className}`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[150px]">
        {items.map((item, index) => (
          <button
            key={index}
            className={`
              w-full flex items-center gap-3 px-4 py-2 text-sm text-left
              transition-colors duration-150
              ${
                item.variant === "danger"
                  ? "text-red-600 hover:bg-red-50"
                  : "text-zinc-700 hover:bg-zinc-50"
              }
            `}
            onClick={() => {
              onMenuItemClick?.(item.menuId, item.itemPayload || null);
              onClose();
            }}
          >
            {item.icon && (
              <Icon
                name={item.icon}
                className={`text-base ${
                  item.variant === "danger" ? "text-red-500" : "text-zinc-500"
                }`}
              />
            )}
            <span className="whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
