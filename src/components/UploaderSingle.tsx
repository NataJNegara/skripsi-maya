"use client";

import { cn } from "@/lib/utils";
import { Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useFileUpload } from "@/context/FileUploadContext";

type UploadFile = {
  id: string;
  file: File;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
};

const UploaderSingle = () => {
  const [file, setFile] = useState<UploadFile | null>(null);
  const { onUpload, onDelete } = useFileUpload();

  // DELETE
  const deleteFile = async () => {
    if (!file) return;

    try {
      if (file.objectUrl) {
        URL.revokeObjectURL(file.objectUrl);
      }

      setFile((prev) => prev && { ...prev, isDeleting: true });

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: file.key }),
      });

      if (!response.ok) {
        toast.error("Failed to delete file");
        setFile((prev) => prev && { ...prev, isDeleting: false, error: true });
        return;
      }

      onDelete(file.key as string);
      const { message } = await response.json();
      toast.success(message);
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete file");
      setFile((prev) => prev && { ...prev, isDeleting: false, error: true });
    }
  };

  // UPLOAD
  const uploadFile = async (uploadingFile: File) => {
    setFile((prev) => prev && { ...prev, uploading: true });

    try {
      const presignedUrlResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: uploadingFile.name,
          contentType: uploadingFile.type,
          size: uploadingFile.size,
        }),
      });

      if (!presignedUrlResponse.ok) {
        toast.error("Failed to get presigned url");
        setFile(
          (prev) =>
            prev && { ...prev, uploading: false, error: true, progress: 0 }
        );
        return;
      }

      const { presignedUrl, key } = await presignedUrlResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFile(
              (prev) =>
                prev && {
                  ...prev,
                  progress: Math.round(percentageCompleted),
                  key,
                }
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFile(
              (prev) =>
                prev && {
                  ...prev,
                  progress: 100,
                  uploading: false,
                  error: false,
                }
            );
            toast.success("File uploaded successfully");
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("upload failed"));

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", uploadingFile.type);
        xhr.send(uploadingFile);
      });

      onUpload({
        fileUrl: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.${process.env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}/${key}`,
      });
    } catch (err) {
      console.error(err);
      toast.error("something went wrong");
      setFile(
        (prev) =>
          prev && { ...prev, uploading: false, progress: 0, error: true }
      );
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const fileObj: UploadFile = {
        id: uuidv4(),
        file: acceptedFiles[0],
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        objectUrl: URL.createObjectURL(acceptedFiles[0]),
      };
      setFile(fileObj);
      uploadFile(acceptedFiles[0]);
    }
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "too-many-files"
      );
      const fileTooLarge = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error("Hanya bisa mengupload 1 gambar");
      }

      if (fileTooLarge) {
        toast.error("Ukuran gambar terlalu besar, maksimal 1 mb");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 1,
    accept: { "image/*": [] },
  });

  return (
    <div>
      {!file && (
        <Card
          className={cn(
            "relative w-full h-64 border-2 border-dashed transition-all duration-300 ease-in-out",
            isDragActive
              ? "border-brand border-solid bg-brand/10"
              : "border-brand hover:border-brand-accent bg-brand/10"
          )}
          {...getRootProps()}>
          <input {...getInputProps()} />
          <CardContent className="flex items-center justify-center h-full font-semibold text-brand-accent">
            {isDragActive ? (
              <p className="text-center">Drop the file here ...</p>
            ) : (
              <div className="flex flex-col gap-6 items-center justify-center">
                <p>Drag & drop a file here, or click to select</p>
                <Button
                  type="button"
                  className="cursor-pointer bg-brand-accent">
                  Select file
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {file && (
        <div className="mt-4">
          <div className="relative max-w-[160px] aspect-square rounded-lg overflow-hidden">
            <Image
              src={file.objectUrl!}
              alt={file.file.name}
              width={200}
              height={100}
              className="object-cover w-full h-full"
            />

            <Button
              variant="destructive"
              className="absolute top-2 right-2 cursor-pointer"
              onClick={deleteFile}
              disabled={file.isDeleting || file.uploading}>
              {file.isDeleting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2Icon />
              )}
            </Button>

            {file.uploading && !file.isDeleting && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <p className="text-brand-white font-semibold text-lg">
                  {file.progress}%
                </p>
              </div>
            )}
            {file.error && (
              <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                <p className="text-brand-white font-semibold text-lg">Error</p>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate mt-1">
            {file.file.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default UploaderSingle;
