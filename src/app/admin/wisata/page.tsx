import Link from "next/link";

const Page = () => {
  return (
    <div className="">
      <p>wisata</p>
      <Link href="/admin/wisata/baru">Tambah wisata</Link>
    </div>
  );
};

export default Page;
