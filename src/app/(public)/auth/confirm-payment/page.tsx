import { Button } from "@/app/_components/ui/button";
import { IcWhatsApp } from "@/app/_components/ui/icons/ic-whatsapp";
import { useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();
  const handleWhatsAppConfirmation = () => {
    const whatsappNumber = "08123456789";
    const message = encodeURIComponent(
      `Assalamualaikum,\n\nSaya ingin mengkonfirmasi pembayaran untuk kursus di Najm Course:\n` +
        `Nominal: Rp 1.000.000\n` +
        `Bank: BNI\n` +
        `No. Rekening: 02312234\n` +
        `\nMohon konfirmasi penerimaan pembayaran.\n` +
        `Terima kasih.`,
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="flex lg:h-screen h-full">
      {/* Form Section */}
      <div className="flex flex-col lg:w-1/2 w-full h-full justify-center items-center rounded-md shadow-lg p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Konfirmasi Pembayaran</h2>
            <p className="mt-2 text-sm text-gray-600">
              Silakan konfirmasi pembayaran Anda melalui WhatsApp
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Status:</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Menunggu Konfirmasi
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-gray-600">Total Pembayaran:</span>
              <span className="text-2xl font-bold text-blue-600">Rp 1.000.000</span>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Bank:</span>
              <span className="font-medium">BNI</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">No. Rekening:</span>
              <span className="font-medium">02312234</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleWhatsAppConfirmation}
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <IcWhatsApp className="w-6 h-6" />
              <span className="font-medium">Kirim Bukti Pembayaran via WhatsApp</span>
            </button>

            <Button variant="secondary" className="w-full" onClick={() => navigate("/auth/login")}>
              Kembali ke halaman login
            </Button>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="hidden lg:flex w-1/2 h-full bg-[url('/background-image.jpg')] bg-no-repeat bg-cover bg-center relative items-center justify-center">
        <div className="absolute inset-0 bg-blue-500 bg-opacity-70"></div>
        <div className="z-10 text-center text-white space-y-4">
          <h2 className="text-4xl font-bold">
            <span className="text-yellow-400">NAJM</span> COURSE
          </h2>
          <p className="text-lg">Taruna Learning Center</p>
          <p className="text-sm max-w-md mx-auto">
            Bergabunglah dengan ribuan siswa yang telah sukses belajar bersama kami
          </p>
        </div>
      </div>
    </section>
  );
};
