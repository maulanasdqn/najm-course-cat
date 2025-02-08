import React, { useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
}

export const OtpInput = ({ value = "", onChange, length = 6, className }: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const createRefs = (count: number) => {
    return Array(count)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || null);
  };

  inputRefs.current = createRefs(length);

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    if (!/^\d*$/.test(newValue)) return; // Only allow digits

    const newOtpValue = value.slice(0, index) + newValue.slice(-1) + value.slice(index + 1);
    onChange(newOtpValue);

    if (newValue && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (value[index]) {
        const newOtpValue = value.slice(0, index) + "" + value.slice(index + 1);
        onChange(newOtpValue);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (!/^\d+$/.test(pastedData)) return; // Only allow digits

    const newValue = pastedData.slice(0, length).padEnd(length, "");
    onChange(newValue);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newValue.indexOf("");
    focusInput(nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex);
  };

  return (
    <div className={`flex gap-2 justify-center ${className || ""}`}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onClick={() => focusInput(index)}
          className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      ))}
    </div>
  );
};
