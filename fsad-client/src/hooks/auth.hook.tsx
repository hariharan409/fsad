import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/context/AuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuthContext();

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(payload));
        setUser(payload);

        toast({ title: "Login successful", description: `Welcome ${payload.username}` });
        navigate("/dashboard");
      } else {
        toast({ variant: "destructive", title: "Login failed", description: data.message });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Could not connect to server" });
    }
  };

  return login;
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuthContext();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast({ title: "Logged out" });
    navigate("/login");
  };
};
