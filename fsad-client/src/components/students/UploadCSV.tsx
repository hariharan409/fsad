import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Props = {
  onUploadComplete?: () => void;
};

const UploadCSV: React.FC<Props> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/upload-csv`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: "Upload Successful", description: `${data.count} students added.` });
        onUploadComplete?.();
      } else {
        toast({ variant: "destructive", title: "Upload Failed", description: data.message });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Server Error", description: "Could not upload file." });
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="space-y-3">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {file && <p className="text-sm">Selected: {file.name}</p>}
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default UploadCSV;
