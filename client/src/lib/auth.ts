import { apiRequest } from "./queryClient";

export interface AuthUser {
  id: number;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function loginAdmin(credentials: LoginCredentials): Promise<AuthUser> {
  const response = await apiRequest("POST", "/api/admin/login", credentials);
  const result = await response.json();
  return result.user;
}

export function getStoredAuth(): AuthUser | null {
  const stored = localStorage.getItem("admin_user");
  return stored ? JSON.parse(stored) : null;
}

export function storeAuth(user: AuthUser): void {
  localStorage.setItem("admin_user", JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem("admin_user");
}
