import { FC, ReactElement } from "react";

type NavbarProps = {
  accountName: string;
};

const Navbar: FC<NavbarProps> = ({ accountName }): ReactElement => {
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    return initials.slice(0, 2);
  };

  return (
    <header className="flex sticky top-0 w-full py-1 bg-white z-10 pr-8 justify-between items-center ">
      <div className="pl-8">
        <img src="/logo.png" alt="logo" className="w-24" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-semibold">{accountName}</span>
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          {/* Inisial Profil */}
          <span className="font-bold">{getInitials(accountName)}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
