import { FC, ReactElement } from "react";

const Navbar: FC = (): ReactElement => {
  return (
    <header className="sticky top-0 w-full bg-white z-10 flex justify-center px-6 py-3 ml-72">
      <div className="py-2 flex justify-end items-center w-full max-w-7xl">
        <div className="flex items-center justify-end gap-x-3 w-full px-6">
          <span className="text-gray-700 font-semibold">Jajang A</span>
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <span className="font-bold">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
