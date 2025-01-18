import { FC, ReactElement } from "react";

const Navbar: FC = (): ReactElement => {
  return (
    <header className="sticky top-0 w-full bg-white z-10">
      <div className="max-w-7xl mx-auto py-2 flex justify-between items-center">
        {/* Logo di sebelah kiri */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-24 h-12" />
        </div>

        {/* Akun di sebelah kanan */}
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-semibold">Nama Akun</span>
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
            {/* Placeholder untuk Inisial Profil */}
            <span className="font-bold">NA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
