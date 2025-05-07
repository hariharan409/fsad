import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const UploadCSV = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // TODO: parse CSV here
    }
  };

  return (
    <div className="space-y-3">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {fileName && <p className="text-sm">Selected: {fileName}</p>}
      <Button disabled>Upload (Coming Soon)</Button>
    </div>
  );
};

export default UploadCSV;
