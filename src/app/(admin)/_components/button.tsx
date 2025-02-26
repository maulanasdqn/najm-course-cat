import { Link } from "react-router-dom";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-600",
};

export const Button = ({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  type,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
}) => {
  return href ? (
    <Link to={href} className={`rounded px-4 py-2 ${className} ${variants[variant]}`}>
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={`rounded px-4 py-2 ${className} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
