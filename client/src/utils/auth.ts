const STORAGE_KEYS = {
  TOKEN: "token",
};

export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const hasToken = (): boolean => {
  return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("token");
}

export const logout = (): void => {}
