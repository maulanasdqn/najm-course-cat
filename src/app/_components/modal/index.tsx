import { FC, ReactElement } from "react";
import { createPortal } from "react-dom";

export const Modal: FC = (): ReactElement => {
  createPortal("", document.body);
  return <div>Modal</div>;
};
