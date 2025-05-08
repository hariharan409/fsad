import { useToast } from "@/hooks/use-toast";

export const useVaccinate = () => {
  const { toast } = useToast();

  const vaccinateStudent = async (studentId: string, driveId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/drives/${driveId}/vaccinate/${studentId}`,
        { method: "PUT" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to vaccinate");
      }

      toast({
        title: "Vaccination Successful",
        description: `Student has been assigned to the drive.`,
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    }
  };

  return { vaccinateStudent };
};
