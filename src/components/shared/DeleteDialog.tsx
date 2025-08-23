"use client";

import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";

type DeleteDialogProps = {
  id: string;
  action: (params: string) => Promise<{ success: boolean; message: string }>;
};

const DeleteDialog = ({ id, action }: DeleteDialogProps) => {
  const handleDelete = async (targetedId: string) => {
    const res = await action(targetedId);
    if (!res.success) {
      return toast.error(res.message);
    }

    toast.success(res.message);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="flex items-center">
        <Button className="flex items-center gap-2 w-full h-1/2 bg-transparent hover:bg-red-500 text-gray-800 hover:text-red-50 cursor-pointer transition-all duration-300">
          <Trash />
          <span>Hapus</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin ingin menghapus item ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini tidak bisa dibatalkan. Data anda akan dihapus permanen dan
            tidak bisa dipulihkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-red-500 hover:bg-red-600"
            onClick={() => handleDelete(id)}>
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
