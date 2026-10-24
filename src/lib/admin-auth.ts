import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ff_admin_token';
const HEADER_NAME = 'X-Admin-Token';

export function getAdminToken(): string {
  try {
    return sessionStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setAdminToken(token: string): void {
  try {
    if (token) sessionStorage.setItem(STORAGE_KEY, token);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // sessionStorage unavailable — non-fatal
  }
}

export function clearAdminToken(): void {
  setAdminToken('');
}

export function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      [HEADER_NAME]: token,
    },
  });
}

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(() => getAdminToken().length > 0);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const verify = useCallback(async (endpoint: string): Promise<boolean> => {
    setChecking(true);
    setError('');
    try {
      const res = await fetch(endpoint, {
        headers: { [HEADER_NAME]: password },
      });
      if (res.ok) {
        setAdminToken(password);
        setAuthenticated(true);
        setPassword('');
        return true;
      }
      if (res.status === 401) {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Could not verify access. Please try again later.');
      }
      return false;
    } catch {
      setError('Network error. Please check your connection and try again.');
      return false;
    } finally {
      setChecking(false);
    }
  }, [password]);

  const logout = useCallback(() => {
    clearAdminToken();
    setAuthenticated(false);
  }, []);

  return { authenticated, password, setPassword, error, checking, verify, logout };
}
