"use client";

import { cn } from "@/lib/utils";
import { Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useFileUpload } from "@/context/FileUploadContext";

const Uploader = () => {
  const [files, setFiles] = useState<
    Array<{
      id: string; //unique identifier
      file: File; // the file
      uploading: boolean; //is the file currently uploading?
      progress: number; //upload progress in percentage
      key?: string; //the key of the file in the storage
      isDeleting: boolean; //is the file currently being deleted
      error: boolean; // has the file upload failed
      objectUrl?: string; //the object url of the file
    }>
  >([]);

  const { onUpload, onDelete } = useFileUpload();

  // DELETE FUNCTION
  const deleteFile = async (fileId: string) => {
    try {
      const fileToRemove = files.find((file) => file.id === fileId);

      if (!fileToRemove) {
        return toast.error("File is not found");
      }

      // handle memory leak on browser
      if (fileToRemove && fileToRemove.objectUrl) {
        URL.revokeObjectURL(fileToRemove.objectUrl);
      }

      setFiles((prevFiles) =>
        prevFiles.map((item) =>
          item.id === fileId ? { ...item, isDeleting: true } : item
        )
      );

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: fileToRemove?.key,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to delete file");
        setFiles((prevFiles) =>
          prevFiles.map((item) =>
            item.id === fileId
              ? { ...item, isDeleting: false, error: true }
              : item
          )
        );
        return;
      }

      // delete file from context
      onDelete(fileToRemove.key as string);

      const { message } = await response.json();
      toast.success(message);

      setFiles((prevFiles) => prevFiles.filter((item) => item.id !== fileId));
    } catch (err) {
      toast.error("Failed to delete file");

      setFiles((prevFiles) =>
        prevFiles.map((item) =>
          item.id === fileId
            ? { ...item, isDeleting: false, error: true }
            : item
        )
      );
    }
  };

  //   UPLOAD FUNCTION
  const uploadFile = async (file: File) => {
    setFiles((prevFile) =>
      prevFile.map((item) =>
        item.file === file ? { ...item, uploading: true } : item
      )
    );

    try {
      // GETTING THE PRESIGNED URL FROM API
      const presignedUrlResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!presignedUrlResponse.ok) {
        toast.error("Failed to get presigned url");

        setFiles((prevFile) =>
          prevFile.map((item) =>
            item.file === file
              ? { ...item, uploading: false, error: true, progress: 0 }
              : item
          )
        );
        return;
      }

      const { presignedUrl, key } = await presignedUrlResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const precentageCompleted = (event.loaded / event.total) * 100;
            setFiles((prevFile) =>
              prevFile.map((item) =>
                item.file === file
                  ? {
                      ...item,
                      progress: Math.round(precentageCompleted),
                      key: key,
                    }
                  : item
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFiles((prevFile) =>
              prevFile.map((item) =>
                item.file === file
                  ? { ...item, progress: 100, uploading: false, error: false }
                  : item
              )
            );

            toast.success("File uploaded successfully");
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error("upload failed"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      onUpload({
        fileUrl: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.${process.env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}/${key}`,
      });
    } catch (error) {
      toast.error("something went wrong");

      setFiles((prevFile) =>
        prevFile.map((item) =>
          item.file === file
            ? { ...item, uploading: false, progress: 0, error: true }
            : item
        )
      );
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => ({
          id: uuidv4(),
          file: file,
          uploading: false,
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
        })),
      ]);
    }

    acceptedFiles.forEach(uploadFile);
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    // Do something with the files
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "too-many-files"
      );
      const fileTooLarge = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error("You can only upload 5 files at a time");
      }

      if (fileTooLarge) {
        toast.error("File size is too large");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5, //5MB
    accept: {
      "image/*": [],
    },
  });

  return (
    <div>
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
            <p className="text-center">Drop the files here ...</p>
          ) : (
            <div className="flex flex-col gap-6 items-center justify-center">
              <p>Drag 'n' drop some files here, or click to select files</p>
              <Button type="button" className="cursor-pointer bg-brand-accent">
                Select file
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {files.map((file) => (
          <div key={file.id} className="flex flex-col gap-1">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={file.objectUrl!}
                alt={file.file.name}
                width={200}
                height={100}
                className="object-cover w-full h-full"
              />

              {/*  DELETE BUTTON */}
              <Button
                variant="destructive"
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => deleteFile(file.id)}
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
                  <p className="text-brand-white font-semibold text-lg">
                    Error
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {file.file.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploader;
