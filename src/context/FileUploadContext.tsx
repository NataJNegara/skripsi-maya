"use client";

import React, { createContext, useContext, useState } from "react";

type File = {
  fileUrl: string;
};

type FileUploadContextType = {
  filesToStore: File[];
  onUpload: (params: File) => void;
  onDelete: (params: string) => void;
};

const FileUploadContext = createContext<FileUploadContextType>({
  filesToStore: [],
  onUpload: () => {},
  onDelete: () => {},
});

function FileUploadProvider({ children }: { children: React.ReactNode }) {
  const [filesToStore, setFileToStore] = useState<File[]>([]);

  const onUpload = (newFile: File) => {
    setFileToStore((prevFiles) => [...prevFiles, newFile]);
  };

  const onDelete = (key: string) => {
    setFileToStore((prevFiles) =>
      prevFiles.filter(
        (item) =>
          item.fileUrl !==
          `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.${process.env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}/${key}`
      )
    );
  };

  return (
    <FileUploadContext.Provider value={{ filesToStore, onUpload, onDelete }}>
      {children}
    </FileUploadContext.Provider>
  );
}

function useFileUpload() {
  const context = useContext(FileUploadContext);
  if (context === undefined)
    throw new Error(
      `file upload provider can't be called outside it's provider`
    );
  return context;
}

export { FileUploadProvider, useFileUpload };
