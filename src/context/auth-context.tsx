import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api, getToken, removeToken, saveToken } from "@/lib/api";

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, full_name: string) => Promise<void>;
  signOut: () => void;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }

    api.get<AuthUser>('/auth/me')
      .then(setUser)
      .catch(() => removeToken())
      .finally(() => setLoading(false));
  }, []);

  async function signIn(email: string, password: string) {
    const { token, user: u } = await api.post<{ token: string; user: AuthUser }>('/auth/login', { email, password });
    saveToken(token);
    setUser(u);
  }

  async function signUp(email: string, password: string, full_name: string) {
    const { token, user: u } = await api.post<{ token: string; user: AuthUser }>('/auth/register', { email, password, full_name });
    saveToken(token);
    setUser(u);
  }

  function signOut() {
    removeToken();
    setUser(null);
  }

  return (
    <Ctx.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
