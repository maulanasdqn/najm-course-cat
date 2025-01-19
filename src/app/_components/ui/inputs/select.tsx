import type { DetailedHTMLProps, SelectHTMLAttributes, ReactElement, ReactNode } from "react";
import { InputWrap, TInputWrap } from "./wrap";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { clsx } from "clsx";

type TSelect<T extends FieldValues> = Omit<TInputWrap, "children"> &
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> &
  UseControllerProps<T> & {
    placeholder?: string;
    append?: ReactNode;
    preppend?: ReactNode;
    options: { value: string | number; label: string }[];
    multiple?: boolean;
  };

export const Select = <T extends FieldValues>(props: TSelect<T>): ReactElement => {
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
      <select
        className={className}
        {...field}
        multiple={props.multiple}
        value={props.multiple ? field.value || [] : field.value}
        onChange={(e) => {
          const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
          field.onChange(props.multiple ? selectedValues : e.target.value);
        }}
      >
        {!props.multiple && (
          <option value="" disabled>
            {props.placeholder || "Pilih"}
          </option>
        )}
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute left-2 top-6">{props.preppend}</div>
      <div className="absolute right-2 top-6">{props.append}</div>
    </InputWrap>
  );
};
