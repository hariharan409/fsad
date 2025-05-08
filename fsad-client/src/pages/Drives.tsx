import React, { useEffect, useState } from "react";
import DriveTable from "@/components/drives/DriveTable";
import DriveForm from "@/components/drives/DriveForm";
import DriveFilterBar from "@/components/drives/DriveFilterBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drive, useDrives } from "@/hooks/useDrives";

const Drives = () => {
  const { drives, fetchDrives, saveDrive } = useDrives();

  const [showForm, setShowForm] = useState(false);
  const [editingDrive, setEditingDrive] = useState<Drive | null>(null);

  const [filterVaccine, setFilterVaccine] = useState("");
  const [filterClass, setFilterClass] = useState("");

  useEffect(() => {
    fetchDrives();
  }, []);

  const filteredDrives = drives.filter((drive) => {
    const matchVaccine = drive.vaccine_name
      .toLowerCase()
      .includes(filterVaccine.toLowerCase());

    const matchClass =
      !filterClass || drive.applicable_classes.includes(filterClass);

    return matchVaccine && matchClass;
  });

  const handleSubmit = async (drive: Drive) => {
    await saveDrive(drive);
    setShowForm(false);
    setEditingDrive(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vaccination Drives</h1>
        <Button onClick={() => setShowForm(true)}>+ Add Drive</Button>
      </div>

      <DriveFilterBar
        filterVaccine={filterVaccine}
        setFilterVaccine={setFilterVaccine}
        filterClass={filterClass}
        setFilterClass={setFilterClass}
      />

      <DriveTable
        drives={filteredDrives}
        onEdit={(drive) => {
          setEditingDrive(drive);
          setShowForm(true);
        }}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingDrive ? "Edit Drive" : "Add Drive"}
            </DialogTitle>
          </DialogHeader>
          <DriveForm
            initialData={editingDrive || undefined}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Drives;
