import { useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";

interface OTPInputProps {
  length: number;
  value: string;
  onChange: (otp: string, otpPasted?: boolean) => void;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
}

export const OTPInput = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  errorMessage,
  className = "",
}: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array if not already done
  if (inputRefs.current.length !== length) {
    inputRefs.current = new Array(length).fill(null);
  }

  const otpArray = value.split("").slice(0, length);

  // Fill remaining slots with empty strings
  while (otpArray.length < length) {
    otpArray.push("");
  }

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    // Only allow single digit
    const digit = inputValue.replace(/[^0-9]/g, "").slice(-1);

    const newOtpArray = [...otpArray];
    newOtpArray[index] = digit;

    const newOtp = newOtpArray.join("");
    onChange(newOtp);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/[^0-9]/g, "")
      .slice(0, length);
    onChange(pastedData, true);

    // Focus the next empty input or the last one
    const nextEmptyIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-center gap-3">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`
              w-12 h-12 text-center text-lg font-semibold
              border-2 rounded-lg
              transition-colors duration-200
              ${
                disabled
                  ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-not-allowed"
                  : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400"
              }
              ${errorMessage ? "border-red-500 dark:border-red-400" : ""}
              text-gray-900 dark:text-white
              focus:outline-none focus:ring-0
            `}
          />
        ))}
      </div>

      {errorMessage && <p className="text-red-500 dark:text-red-400 text-sm text-center mt-1">{errorMessage}</p>}
    </div>
  );
};
