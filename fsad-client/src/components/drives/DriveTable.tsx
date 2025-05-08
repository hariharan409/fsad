import React from "react";
import { Drive } from "@/hooks/useDrives";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

type Props = {
  drives: Drive[];
  onEdit?: (drive: Drive) => void;
};

const DriveTable: React.FC<Props> = ({ drives, onEdit }) => {
  const today = new Date();

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-medium">Vaccine</th>
            <th className="px-4 py-2 font-medium">Date</th>
            <th className="px-4 py-2 font-medium">Doses</th>
            <th className="px-4 py-2 font-medium">Remaining</th>
            <th className="px-4 py-2 font-medium">Classes</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((drive) => {
            const isPast = new Date(drive.date) < today;
            const remaining =
              drive.number_of_doses - drive.students_vaccinated.length;

            return (
              <tr key={drive._id || drive.vaccine_name + drive.date} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{drive.vaccine_name}</td>
                <td className="px-4 py-2">{format(new Date(drive.date), "dd MMM yyyy")}</td>
                <td className="px-4 py-2">{drive.number_of_doses}</td>
                <td className="px-4 py-2">{remaining}</td>
                <td className="px-4 py-2">{drive.applicable_classes.join(", ")}</td>
                <td className="px-4 py-2">
                  {isPast ? (
                    <span className="text-red-600 font-semibold">Expired</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Upcoming</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {!isPast && onEdit && (
                    <Button variant="outline" size="sm" onClick={() => onEdit(drive)}>
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DriveTable;
