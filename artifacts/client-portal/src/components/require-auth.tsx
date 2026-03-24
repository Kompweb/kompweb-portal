import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const [, setLocation] = useLocation();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("kw_user");
      if (raw) {
        const user = JSON.parse(raw);
        if (user?.name && user?.email) {
          setAuthed(true);
        } else {
          setLocation("/");
        }
      } else {
        setLocation("/");
      }
    } catch {
      setLocation("/");
    }
    setChecked(true);
  }, [setLocation]);

  if (!checked) return null;
  if (!authed) return null;

  return <>{children}</>;
}
