import React, { useState } from "react";
import { Drive } from "@/hooks/useDrives";
import { Student } from "@/hooks/useStudents";
import { useVaccinate } from "@/hooks/useVaccinate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  student: Student;
  drives: Drive[];
  onClose: () => void;
  onComplete: () => void;
};

const AssignVaccinesModal: React.FC<Props> = ({
  student,
  drives,
  onClose,
  onComplete
}) => {
  const { vaccinateStudent } = useVaccinate();
  const [selectedDrives, setSelectedDrives] = useState<Set<string>>(new Set());

  const eligibleDrives = drives.filter((drive) => {
    const remaining = drive.number_of_doses - drive.students_vaccinated.length;
    const alreadyVaccinated = student.vaccinations?.some(
      (v) => v.vaccine_name === drive.vaccine_name
    );

    return (
      drive.applicable_classes.includes(student.class) &&
      remaining > 0 &&
      !alreadyVaccinated
    );
  });

  const toggleDrive = (id: string) => {
    setSelectedDrives((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleAssign = async () => {
    for (const driveId of selectedDrives) {
      await vaccinateStudent(student._id!, driveId);
    }
    onClose();
    onComplete();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Vaccines for {student.name}</DialogTitle>
        </DialogHeader>

        {eligibleDrives.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {eligibleDrives.map((drive) => {
              const remaining =
                drive.number_of_doses - drive.students_vaccinated.length;

              return (
                <label key={drive._id} className="flex gap-2 items-center text-sm">
                  <input
                    type="checkbox"
                    checked={selectedDrives.has(drive._id!)}
                    onChange={() => toggleDrive(drive._id!)}
                  />
                  {drive.vaccine_name} — {new Date(drive.date).toLocaleDateString()} —{" "}
                  <span className="text-xs text-gray-500">{remaining} slots left</span>
                </label>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No eligible drives available.</p>
        )}

        <div className="pt-4 flex justify-end">
          <Button
            onClick={handleAssign}
            disabled={selectedDrives.size === 0}
          >
            Assign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignVaccinesModal;
