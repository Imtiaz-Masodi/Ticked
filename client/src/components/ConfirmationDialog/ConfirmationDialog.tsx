import React from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ButtonType, ButtonVariant } from "../Button/Button.enum";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { Size } from "../../utils/enums";

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
  disabled?: boolean;
}

const variantConfig = {
  danger: {
    icon: Icons.warning,
    iconColor: "text-red-500",
    confirmVariant: ButtonVariant.danger,
  },
  warning: {
    icon: Icons.warning,
    iconColor: "text-yellow-500",
    confirmVariant: ButtonVariant.warning,
  },
  info: {
    icon: Icons.info,
    iconColor: "text-blue-500",
    confirmVariant: ButtonVariant.info,
  },
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
  isLoading = false,
  disabled = false,
}) => {
  const config = variantConfig[variant];

  const handleConfirm = () => {
    if (!disabled && !isLoading) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      size={Size.sm}
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      showCloseButton={false}
    >
      <div>
        {/* Header with Icon and Title on the same line */}
        <div className="flex items-center gap-3 mb-4">
          <Icon name={config.icon} className={`${config.iconColor} text-xl flex-shrink-0`} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-6">{title}</h3>
        </div>

        {/* Message - left aligned */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-left">{message}</p>

        {/* Actions - right aligned */}
        <div className="flex gap-3 justify-end">
          <Button
            variant={ButtonVariant.secondary}
            type={ButtonType.outline}
            size={Size.sm}
            onClick={handleCancel}
            disabled={isLoading}
            className="min-w-[80px]"
          >
            {cancelText}
          </Button>
          <Button
            variant={config.confirmVariant}
            type={ButtonType.solid}
            size={Size.sm}
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={disabled || isLoading}
            className="min-w-[80px]"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
