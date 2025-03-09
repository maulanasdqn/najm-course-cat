import { useState } from "react";
import { upload } from "@/api/storage";
import { Button } from "../button";
import { TrashIcon } from "../icons/ic-trash";

interface FileUploadProps {
  label: string;
  onUpload: (url: string) => void;
  defaultFile?: string;
}

export const FileUpload = ({ label, onUpload, defaultFile }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultFile || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsUploading(true);
      try {
        const { url } = await upload(selectedFile);
        onUpload(url);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl("");
    onUpload("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="h-32 w-32 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${label}`}
            accept="image/*"
          />
          <label
            htmlFor={`file-upload-${label}`}
            className="cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </label>
        </div>
      )}
    </div>
  );
};
