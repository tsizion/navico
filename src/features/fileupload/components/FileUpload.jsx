import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { UploadCloud, Loader2, X } from "lucide-react";
import { uploadSingleFileUseCase } from "../usecase/fileUploadUseCase";
import { useToast } from "@/hooks/use-toast";

const fileTypes = ["JPG", "PNG", "JPEG"];

export const FileUploadUI = ({ onFileSelect }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (file) => {
    setUploading(true);

    try {
      const uploaded = await uploadSingleFileUseCase(file);
      setUploadedFile(uploaded.url);
      onFileSelect(uploaded.url);

      toast({
        title: "Upload Successful ✅",
        description: "Your file has been uploaded.",
      });
    } catch (err) {
      toast({
        title: "Upload Failed ❌",
        description: err.message || "Unable to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full border-2 border-dashed rounded-xl cursor-pointer bg-gray-50/40 h-44 flex items-center justify-center">
      {!uploadedFile ? (
        <FileUploader
          handleChange={handleFileChange}
          types={fileTypes}
          name="file"
        >
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin text-gray-500" />
                <p className="text-xs text-gray-500">Uploading...</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-7 h-7 text-gray-500" />
                <p className="text-sm text-gray-600 font-medium">
                  Click or Drag & Drop
                </p>
                <span className="text-xs text-gray-400">
                  JPG, PNG up to 5MB
                </span>
              </>
            )}
          </div>
        </FileUploader>
      ) : (
        // ✅ Preview with X flush top-right corner of the image
        <div className="flex items-center w-full px-4 py-3">
          <div className="relative w-24 h-24">
            <img
              src={uploadedFile}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
            {/* X button exactly on top-right corner */}
            <button
              onClick={() => {
                setUploadedFile(null);
                onFileSelect(null);
              }}
              className="absolute top-0 right-0 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
