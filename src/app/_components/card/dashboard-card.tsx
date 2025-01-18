import { FC, ReactElement, ReactNode } from "react";

type TCard = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

export const CardDashboard: FC<TCard> = ({ icon, title, subtitle }): ReactElement => {
  return (
    <div className="flex items-center h-auto p-4 bg-white rounded shadow-md w-auto">
      <div className="px-2 text-primary">{icon}</div>
      <div className="ml-4">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};
