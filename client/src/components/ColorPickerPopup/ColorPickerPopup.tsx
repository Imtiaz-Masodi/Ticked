import React from "react";
import Popup from "../Popup";
import ColorPicker from "../ColorPicker";

interface ColorPickerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
  triggerRef: React.RefObject<HTMLElement>;
  disabled?: boolean;
  label?: string;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  showArrow?: boolean;
}

function ColorPickerPopup({
  isOpen,
  onClose,
  selectedColor,
  onColorChange,
  triggerRef,
  disabled = false,
  label = "Choose Color",
  className = "",
  position = "bottom",
  showArrow = true,
}: ColorPickerPopupProps) {
  const handleColorChange = (color: string) => {
    onColorChange(color);
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      className={className}
      position={position}
      showArrow={showArrow}
    >
      <ColorPicker
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        disabled={disabled}
        label={label}
      />
    </Popup>
  );
}

export default ColorPickerPopup;
