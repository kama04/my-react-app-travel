import React, { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const LS_KEY = "travel_dz_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (loginValue, passwordValue) => {
    if (loginValue === "admin" && passwordValue === "1234") {
      const u = { login: loginValue };
      setUser(u);
      localStorage.setItem(LS_KEY, JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
