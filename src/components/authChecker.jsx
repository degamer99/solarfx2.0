// hooks/useAuth.ts
"use client"
import { useEffect, useState } from 'react';
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from 'next/navigation';

const useAuth = () => {
//   const [user, setUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if(!router.isReady) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push('/'); // Redirect to index page if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [router, router.isReady]);

  return (<div>
        this the auth checker
    </div>
  );
};

export default useAuth;
