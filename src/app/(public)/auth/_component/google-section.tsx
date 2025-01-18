import { GoogleButton } from "../../../_components/ui/button/google-button";
import { FC, ReactElement } from "react";

type TProps = {
  onClick: () => void;
  title: string;
};

export const GoogleSection: FC<TProps> = (props): ReactElement => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center w-full">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="px-4 text-gray-500 text-sm">{props.title}</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>
      <GoogleButton onClick={props.onClick} />
    </div>
  );
};
