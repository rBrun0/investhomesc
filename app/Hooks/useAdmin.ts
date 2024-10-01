import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, getIdTokenResult } from "firebase/auth";

function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const tokenResult = await getIdTokenResult(user);
        if (tokenResult.claims.admin) {
          setIsAdmin(true);
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return isAdmin;
}

export default useAdmin;