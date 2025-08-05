import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        <div className="text-center">
          <p className="font-mak text-2xl font-bold">
            Error 404: Halaman tidak ditemukan!
          </p>
          <p>Kami tidak menemukan halaman yang anda cari.</p>
        </div>
        <Link href="/" className="button-brand px-6 py-3">
          Kembali ke halaman utama
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
