import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { UploadCloud } from "lucide-react";
import { uploadSingleFileUseCase } from "../usecase/fileuploadusecase";

const fileTypes = ["JPG", "PNG", "JPEG"];

export const FileUploadUI = ({ onFileSelect }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  // ✅ Define handleFileChange properly
  const handleFileChange = async (file) => {
    try {
      const uploaded = await uploadSingleFileUseCase(file);

      setUploadedFile(uploaded); // show preview
      onFileSelect && onFileSelect(uploaded.url); // pass URL to parent
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="w-full border-2 border-dashed rounded-xl cursor-pointer">
      <FileUploader
        handleChange={handleFileChange} // use the correct function
        name="file"
        types={fileTypes}
      >
        {uploadedFile?.url ? (
          <img
            src={uploadedFile.url}
            alt="Uploaded"
            className="w-full h-44 object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-44 py-4 flex flex-col justify-center items-center gap-2 bg-gray-50/40">
            <UploadCloud className="w-7 h-7 text-gray-500" />
            <p className="text-sm text-gray-600 font-medium">
              Click or Drag & Drop
            </p>
            <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
          </div>
        )}
      </FileUploader>
    </div>
  );
};
