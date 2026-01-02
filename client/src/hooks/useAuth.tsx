import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import type { User } from "@shared/schema";

interface AuthContextType {
  user: User | null | undefined;
  isLoading: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.login(username, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "user"], user);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ username, email, password }: { username: string; email: string; password: string }) =>
      authApi.register(username, email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "user"], user);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.clear();
    },
  });

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const register = async (username: string, email: string, password: string) => {
    await registerMutation.mutateAsync({ username, email, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
