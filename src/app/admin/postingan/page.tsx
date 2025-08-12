import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-12">
        <p className="dashboard-title">Postingan</p>
        <div className="flex justify-end">
          <Link
            href="/admin/postingan/baru"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 px-4 py-2 text-indigo-50 flex items-center gap-2">
            <span>Postingan baru</span>
            <CirclePlus />
          </Link>
        </div>
      </div>

      {/* searchbar & filter */}
      <div className="flex justify-between mb-8">
        <SearchBar />
        <div className="">
          <Button>filter here</Button>
        </div>
      </div>

      <p className="text-sm italic my-8">12 postingan ditemukan.</p>

      {/* table of content */}
      <div className="flex flex-col gap-2">
        <div className="border grid grid-cols-[auto_1fr]">
          <div className="flex gap-2">
            <Image
              src="/images/blog-01.jpg"
              alt="contoh gambar"
              width={150}
              height={100}
            />
            <div className="p-2 flex flex-col gap-2">
              <div className="">
                <p className="font-semibold ">Judul Postingan</p>
                <p className="text-base ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
                  expedita atque laborum optio amet mollitia error ut
                  accusantium dicta at sapiente, exercitationem tenetur dolor
                  laboriosam, dolorum provident vero consequatur autem magni
                  maiores ipsum. Eius quasi nisi deleniti non.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm px-4 rounded-full bg-gray-800 text-gray-50">
                  Blog
                </p>
                <p className="text-xs italic text-gray-500">23-03-2025</p>
              </div>
            </div>
          </div>
          <div className="w-24 border-l">
            <Button className="w-full h-1/2 bg-transparent hover:bg-gray-200 text-gray-800 cursor-pointer transition-all duration-300">
              Ubah
            </Button>
            <Button className="w-full h-1/2 bg-transparent hover:bg-red-500 text-gray-800 hover:text-red-50 cursor-pointer transition-all duration-300">
              Hapus
            </Button>
          </div>
        </div>
        <div className="border grid grid-cols-[auto_1fr]">
          <div className="flex gap-2">
            <Image
              src="/images/blog-01.jpg"
              alt="contoh gambar"
              width={150}
              height={100}
            />
            <div className="p-2 flex flex-col gap-2">
              <div className="">
                <p className="font-semibold ">Judul Postingan</p>
                <p className="text-base ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
                  expedita atque laborum optio amet mollitia error ut
                  accusantium dicta at sapiente, exercitationem tenetur dolor
                  laboriosam, dolorum provident vero consequatur autem magni
                  maiores ipsum. Eius quasi nisi deleniti non.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm px-4 rounded-full bg-yellow-500 text-yellow-50">
                  Event
                </p>
                <p className="text-xs italic text-gray-500">23-03-2025</p>
              </div>
            </div>
          </div>
          <div className="w-24 border-l">
            <Button className="w-full h-1/2 bg-transparent hover:bg-gray-200 text-gray-800 cursor-pointer transition-all duration-300">
              Ubah
            </Button>
            <Button className="w-full h-1/2 bg-transparent hover:bg-red-500 text-gray-800 hover:text-red-50 cursor-pointer transition-all duration-300">
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
