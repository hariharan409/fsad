export type Drive = {
    id: string; // frontend use only
    vaccine_name: string;
    date: Date;
    number_of_doses: number;
    applicable_classes: string[];
    students_vaccinated: string[]; // using string IDs as placeholders
    createdAt: Date;
    updatedAt: Date;
  };
  
  export const mockDrives: Drive[] = [
    {
      id: "d1",
      vaccine_name: "HPV",
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      number_of_doses: 2,
      applicable_classes: ["5A", "5B"],
      students_vaccinated: [],
      createdAt: new Date("2024-12-01T10:00:00Z"),
      updatedAt: new Date("2024-12-02T12:00:00Z"),
    },
    {
      id: "d2",
      vaccine_name: "Tetanus",
      date: new Date(new Date().setDate(new Date().getDate() + 25)),
      number_of_doses: 1,
      applicable_classes: ["6A"],
      students_vaccinated: [],
      createdAt: new Date("2025-01-05T09:30:00Z"),
      updatedAt: new Date("2025-01-06T10:00:00Z"),
    },
    {
      id: "d3",
      vaccine_name: "MMR",
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      number_of_doses: 1,
      applicable_classes: ["6B"],
      students_vaccinated: ["stu1", "stu2"],
      createdAt: new Date("2025-02-01T11:00:00Z"),
      updatedAt: new Date("2025-02-02T13:00:00Z"),
    },
    {
      id: "d4",
      vaccine_name: "HPV",
      date: new Date(new Date().setDate(new Date().getDate() + 45)),
      number_of_doses: 3,
      applicable_classes: ["5B", "6A"],
      students_vaccinated: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "d5",
      vaccine_name: "Tetanus",
      date: new Date(new Date().setDate(new Date().getDate() - 15)),
      number_of_doses: 1,
      applicable_classes: ["5A"],
      students_vaccinated: ["stu3"],
      createdAt: new Date("2025-03-01T08:00:00Z"),
      updatedAt: new Date("2025-03-02T09:00:00Z"),
    },
  ];
  