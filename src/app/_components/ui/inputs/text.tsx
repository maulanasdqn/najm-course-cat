import type { DetailedHTMLProps, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { InputWrap, TInputWrap } from "./wrap";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { clsx } from "clsx";

type TInputText<T extends FieldValues> = Omit<TInputWrap, "children"> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  UseControllerProps<T> & {
    append?: ReactNode;
    preppend?: ReactNode;
  };

export const InputText = <T extends FieldValues>(props: TInputText<T>): ReactElement => {
  const { field, fieldState } = useController<T>(props);

  const className = clsx(
    "w-full p-2 rounded font-medium transition-colors focus:outline-none text-xs",
    {
      "mt-4": !props.label,
      "px-[40px]": props.preppend,
      "border bg-red-50 border-red-400 text-red-400 placeholder-red-200": fieldState.error?.message,
      "border bg-white border-gray-300 text-gray-400 focus:border-gray-400 placeholder-gray-400":
        !fieldState.error?.message,
    },
  );

  return (
    <InputWrap {...props} message={fieldState.error?.message}>
      <input
        className={className}
        {...props}
        {...field}
        placeholder={props.placeholder || "Masukkan"}
      />
      <div className="absolute left-2 top-6">{props.preppend}</div>
      <div className="absolute right-2 top-6">{props.append}</div>
    </InputWrap>
  );
};
