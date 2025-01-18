import type { DetailedHTMLProps, ReactElement, TextareaHTMLAttributes } from "react";
import { InputWrap, TInputWrap } from "./wrap";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { clsx } from "clsx";

type TInputTextArea<T extends FieldValues> = Omit<TInputWrap, "children"> &
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> &
  UseControllerProps<T>;

export const InputTextArea = <T extends FieldValues>(props: TInputTextArea<T>): ReactElement => {
  const { field, fieldState } = useController<T>(props);

  const className = clsx(
    "w-full p-2 rounded font-medium transition-colors focus:outline-none text-xs",
    {
      "mt-4": !props.label,
      "border bg-red-50 border-red-400 text-red-400 placeholder-red-200": fieldState.error?.message,
      "border bg-white border-gray-300 text-gray-400 focus:border-gray-400 placeholder-gray-400":
        !fieldState.error?.message,
    },
  );

  return (
    <InputWrap {...props} message={fieldState.error?.message}>
      <textarea
        className={className}
        {...props}
        {...field}
        placeholder={props.placeholder || "Masukkan"}
      />
    </InputWrap>
  );
};
