import clsx from "clsx";
import { ReactElement, ReactNode } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type TermsCheckboxProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: ReactNode;
};

export const InputCheckbox = <T extends FieldValues>({
  label,
  control,
  name,
  rules,
}: TermsCheckboxProps<T>): ReactElement => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`${name}-checkbox`}
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
          className={clsx(
            "peer h-4 w-4 border-gray-300 rounded focus:ring-0",
            value ? "bg-primary" : "bg-white",
          )}
        />{" "}
        <label
          htmlFor={`${name}-checkbox`}
          className={clsx("text-xs cursor-pointer", {
            "text-gray-700": value,
            "text-gray-400": !value,
          })}
        >
          {label}
        </label>
      </div>
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
};
