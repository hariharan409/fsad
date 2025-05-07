export type VaccinationRecord = {
    vaccine: string;
    date: Date;
  };
  
  export type VaccinatedStudent = {
    id: string;
    name: string;
    class: string;
    vaccinations: VaccinationRecord[];
  };
  
  export const mockReports: VaccinatedStudent[] = [
    {
      id: "S001",
      name: "Alice Tan",
      class: "5A",
      vaccinations: [
        { vaccine: "HPV", date: new Date("2025-03-05") },
        { vaccine: "Tetanus", date: new Date("2025-03-20") },
      ],
    },
    {
      id: "S002",
      name: "Benjamin Lee",
      class: "5B",
      vaccinations: [
        { vaccine: "HPV", date: new Date("2025-03-08") },
      ],
    },
    {
      id: "S003",
      name: "Clara Lim",
      class: "6A",
      vaccinations: [
        { vaccine: "MMR", date: new Date("2025-04-01") },
      ],
    },
    {
      id: "S004",
      name: "Daniel Goh",
      class: "6B",
      vaccinations: [
        { vaccine: "Tetanus", date: new Date("2025-02-15") },
        { vaccine: "MMR", date: new Date("2025-03-10") },
      ],
    },
    {
      id: "S005",
      name: "Eva Ng",
      class: "5A",
      vaccinations: [
        { vaccine: "HPV", date: new Date("2025-03-06") },
      ],
    }
  ];
  