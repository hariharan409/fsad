import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type Drive = {
  _id?: string;
  vaccine_name: string;
  date: string | Date;
  number_of_doses: number;
  applicable_classes: string[];
  students_vaccinated: string[];
  createdAt?: string;
  updatedAt?: string;
};

export const useDrives = () => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const { toast } = useToast();

  const fetchDrives = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/drives`);
      const data = await res.json();
      setDrives(data);
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch drives" });
    }
  };

  const saveDrive = async (drive: Drive) => {
    const isEditing = Boolean(drive._id);
    const url = isEditing
      ? `${import.meta.env.VITE_API_URL}/api/drives/${drive._id}`
      : `${import.meta.env.VITE_API_URL}/api/drives`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(drive),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save drive");
      }

      toast({ title: isEditing ? "Drive Updated" : "Drive Created" });
      await fetchDrives();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  return { drives, fetchDrives, saveDrive };
};
