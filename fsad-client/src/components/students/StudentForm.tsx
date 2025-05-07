import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Vaccination = {
  vaccine_name: string;
  drive_id: string;
  date: Date;
};

type Student = {
  id: string;
  name: string;
  class: string;
  vaccinations: Vaccination[];
};

type Drive = {
  id: string; // use this as unique identifier
  vaccine_name: string;
  date: string | Date;
};

type Props = {
  onSubmit: (student: Student) => void;
  initialData?: Student;
  availableDrives: Drive[];
};

const classOptions = ["5A", "5B", "6A", "6B"];

const StudentForm: React.FC<Props> = ({ onSubmit, initialData, availableDrives }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("5A");
  const [selectedDriveIds, setSelectedDriveIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setName(initialData.name);
      setStudentClass(initialData.class);
      setSelectedDriveIds(new Set(initialData.vaccinations.map((v) => v.drive_id)));
    }
  }, [initialData]);

  const handleToggleDrive = (driveId: string) => {
    setSelectedDriveIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(driveId)) {
        newSet.delete(driveId);
      } else {
        newSet.add(driveId);
      }
      return newSet;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDrives = availableDrives.filter((d) => selectedDriveIds.has(d.id));
    const vaccinations: Vaccination[] = selectedDrives.map((d) => ({
      vaccine_name: d.vaccine_name,
      drive_id: d.id,
      date: new Date(d.date),
    }));

    onSubmit({ id, name, class: studentClass, vaccinations });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Student ID</Label>
        <Input value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>Class</Label>
        <select
          className="w-full border rounded px-3 py-2"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        >
          {classOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Vaccination Drives</Label>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border rounded p-2">
          {availableDrives.map((drive) => {
            const checkboxId = `checkbox-${drive.id}`;
            return (
              <label key={drive.id} htmlFor={checkboxId} className="flex items-center gap-2 text-sm">
                <input
                  id={checkboxId}
                  type="checkbox"
                  checked={selectedDriveIds.has(drive.id)}
                  onChange={() => handleToggleDrive(drive.id)}
                />
                {drive.vaccine_name} — {new Date(drive.date).toLocaleDateString()}
              </label>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit">{initialData ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
};

export default StudentForm;
