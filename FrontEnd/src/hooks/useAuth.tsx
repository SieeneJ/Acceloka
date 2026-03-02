import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem("userId") : null;
    setIsLoggedIn(!!userId);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleUserNavigation = (openModal: () => void) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      router.push("/booking");
    } else {
      openModal();
    }
  };

  const logout = () => {
    sessionStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/");
  };

  return { isLoggedIn, handleUserNavigation, logout, checkAuth };
};