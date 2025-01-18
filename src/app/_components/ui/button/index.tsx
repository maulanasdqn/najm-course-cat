import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type TButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

export const Button: FC<TButton> = ({
  children,
  variant = "primary",
  size = "sm",
  className,
  ...props
}) => {
  const buttonClass = clsx(
    "rounded-full h-11 disabled:opacity-50 disabled:cursor-not-allowed font-semibold",
    {
      "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
      "bg-white border text-blue-400 border-blue-400": variant === "secondary",
      "px-6 py-3 text-sm": size === "lg",
      "px-3 py-3 text-xs": size === "sm",
      "px-4 py-1 text-sm": size === "md",
    },
    className,
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
