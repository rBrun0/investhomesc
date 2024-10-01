'use client'

import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

const useSuperAdmin = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        // Verifica se o token contém a claim de superadmin
        setIsSuperAdmin(!!token.claims.superadmin);
      } else {
        setIsSuperAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isSuperAdmin, loading };
};

export default useSuperAdmin;
