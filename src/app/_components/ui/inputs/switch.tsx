import clsx from "clsx";
import { ReactElement, ReactNode } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type SwitchProps<T extends FieldValues> = UseControllerProps<T> & {
    label?: ReactNode;
    disabled?: boolean;
};

export const InputSwitch = <T extends FieldValues>({
    label,
    control,
    name,
    rules,
    disabled = false,
}: SwitchProps<T>): ReactElement => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control, rules });

    return (
        <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
                <button
                    type="button"
                    role="switch"
                    aria-checked={value || false}
                    id={`${name}-switch`}
                    disabled={disabled}
                    onClick={() => !disabled && onChange(!value)}
                    className={clsx(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                        value ? "bg-primary-500" : "bg-gray-200",
                        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    )}
                >
                    <span
                        className={clsx(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                            value ? "translate-x-6" : "translate-x-1"
                        )}
                    />
                </button>
                {label && (
                    <label
                        htmlFor={`${name}-switch`}
                        className={clsx("text-xs cursor-pointer", {
                            "text-gray-700": value,
                            "text-gray-400": !value,
                            "cursor-not-allowed": disabled,
                        })}
                    >
                        {label}
                    </label>
                )}
            </div>
            {error && <span className="text-red-500 text-xs">{error.message}</span>}
        </div>
    );
};

// For non-form usage
type StandaloneSwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: ReactNode;
    disabled?: boolean;
};

export const Switch = ({
    checked,
    onChange,
    label,
    disabled = false,
}: StandaloneSwitchProps): ReactElement => {
    return (
        <div className="flex items-center space-x-2">
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={clsx(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    checked ? "bg-blue-500" : "bg-gray-200",
                    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                )}
            >
                <span
                    className={clsx(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        checked ? "translate-x-6" : "translate-x-1"
                    )}
                />
            </button>
            {label && (
                <span
                    className={clsx("text-xs", {
                        "text-gray-700": checked,
                        "text-gray-400": !checked,
                        "cursor-not-allowed": disabled,
                    })}
                >
                    {label}
                </span>
            )}
        </div>
    );
};