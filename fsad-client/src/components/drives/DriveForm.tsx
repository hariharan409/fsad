import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Drive } from "@/hooks/useDrives";
import { format } from "date-fns";

type Props = {
  onSubmit: (drive: Drive) => void;
  initialData?: Drive;
};

const classOptions = ["5A", "5B", "6A", "6B"];

const DriveForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const { toast } = useToast();

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
    setClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDate = new Date(date);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 15);

    if (!vaccine || !date || !doses || classes.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (selectedDate < minDate) {
      toast({
        variant: "destructive",
        title: "Invalid Date",
        description: "Drive must be scheduled at least 15 days in advance.",
      });
      return;
    }

    const newDrive: Drive = {
      ...(initialData?._id ? { _id: initialData._id } : {}),
      vaccine_name: vaccine,
      date: selectedDate,
      number_of_doses: doses,
      applicable_classes: classes,
      students_vaccinated: initialData?.students_vaccinated || [],
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
