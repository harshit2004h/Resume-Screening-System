"use client";

import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { cn } from "../lib/utils";

interface UploaderProps {
  endpoint: string;
  value: string[];
  onChange: (urls: string[]) => void;
  className?: string;
}

export function Uploader({
  endpoint,
  value,
  onChange,
  className,
}: UploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      // This is a placeholder for actual upload logic
      // In a real app, you would use something like uploadthing, S3, etc.

      // Simulating upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo, we're creating a fake URL
      // In production, replace with actual upload and file URL generation
      const fakeUrl = `https://example.com/uploads/${Date.now()}-${files[0].name}`;

      onChange([...value, fakeUrl]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = "";
    }
  };

  const removeFile = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-24 h-24 rounded-md overflow-hidden border"
          >
            <Image
              src={url}
              alt="Uploaded file"
              fill
              className="object-cover"
              onError={(e) => {
                // Show placeholder for invalid images
                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
              }}
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-background/80 rounded-full p-1"
              onClick={() => removeFile(url)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <label
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-slate-800",
          isUploading && "opacity-50 pointer-events-none",
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="h-8 w-8 mb-2 text-gray-500 dark:text-gray-400" />
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 2MB)
          </p>
        </div>
        <input
          id={`uploader-${endpoint}`}
          type="file"
          className="hidden"
          onChange={onFilesSelected}
          disabled={isUploading}
          accept="image/*"
        />
      </label>

      {isUploading && (
        <div className="w-full mt-4">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            <div
              className="h-full bg-blue-600 rounded-full animate-pulse"
              style={{ width: "100%" }}
            ></div>
          </div>
          <p className="text-sm text-center mt-2">Uploading...</p>
        </div>
      )}
    </div>
  );
}
