import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Drive } from "./mockDrives";
import { format } from "date-fns";

type Props = {
  onSubmit: (drive: Drive) => void;
  initialData?: Drive;
};

const classOptions = ["5A", "5B", "6A", "6B"];

const DriveForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [vaccine, setVaccine] = useState("");
  const [date, setDate] = useState("");
  const [doses, setDoses] = useState(1);
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setVaccine(initialData.vaccine_name);
      setDate(format(new Date(initialData.date), "yyyy-MM-dd"));
      setDoses(initialData.number_of_doses);
      setClasses(initialData.applicable_classes);
    }
  }, [initialData]);

  const toggleClass = (cls: string) => {
    if (classes.includes(cls)) {
      setClasses(classes.filter((c) => c !== cls));
    } else {
      setClasses([...classes, cls]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDrive: Drive = {
      id: initialData?.id || Date.now().toString(),
      vaccine_name: vaccine,
      date: new Date(date),
      number_of_doses: doses,
      applicable_classes: classes,
      students_vaccinated: [],
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date()
    };
    onSubmit(newDrive);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label>Vaccine Name</Label>
        <Input
          value={vaccine}
          onChange={(e) => setVaccine(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Date</Label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Number of Doses</Label>
        <Input
          type="number"
          value={doses}
          onChange={(e) => setDoses(Number(e.target.value))}
          min={1}
          required
        />
      </div>
      <div>
        <Label>Applicable Classes</Label>
        <div className="flex gap-3 flex-wrap">
          {classOptions.map((cls) => (
            <label key={cls} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={classes.includes(cls)}
                onChange={() => toggleClass(cls)}
              />
              {cls}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">{initialData ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
};

export default DriveForm;
