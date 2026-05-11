const AUTH_KEY = 'agro_admin_auth';
const ADMIN_CREDENTIALS = { email: 'arihant.entt108@gmail.com', password: 'Rishabh@0719' };

export interface AuthSession {
  id: string;
  email: string;
  name: string;
  role: string;
  loginAt: string;
}

export const authService = {
  login(email: string, password: string): AuthSession | null {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const session: AuthSession = {
        id: 'admin-1',
        email,
        name: 'Admin User',
        role: 'admin',
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return session;
    }
    return null;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  getSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },
};
