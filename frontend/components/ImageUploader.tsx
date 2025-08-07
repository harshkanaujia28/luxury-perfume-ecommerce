"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axiosInstance from "@/utils/axios"; // adjust the path to match your project

interface ImageUploaderProps {
  onUpload?: (url: string) => void;
  initialImage?: string;
}

const ImageUploader = ({ onUpload, initialImage }: ImageUploaderProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    setUploading(true);

    try {
      const res = await axiosInstance.post("/upload", formData);
      const { url } = res.data;
      console.log(url);   
      if (url) {
        onUpload?.(url);
        alert("Upload successful!");
      } else {
        alert("Upload failed");
      }

    } catch (error) {
      console.error(error);
      alert("Error uploading");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreview(null);
    onUpload?.("");
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative w-48 h-48">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-md border"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
            onClick={handleRemove}
          >
            <Trash size={18} className="text-red-500" />
          </button>
        </div>
      ) : (
        <input type="file" accept="image/*" onChange={handleFileChange} />
      )}

      {!preview && (
        <Button onClick={handleUpload} disabled={!image || uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
