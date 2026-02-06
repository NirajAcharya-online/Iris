import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firebaseAuth, database } from "../firebase/firebaseSetup";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/userSlice";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUser) => {
        if (!currentUser) {
          dispatch(clearUser());
          return;
        }

        try {
          const userRef = doc(database, "users", currentUser.uid);
          const snap = await getDoc(userRef);

          const dbUser = snap.exists() ? snap.data() : {};
          dispatch(
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              username: currentUser.displayName,
              isVerified: currentUser.emailVerified,
              createdAt: currentUser.metadata.createdAt,
              role: dbUser.role,
            }),
          );
        } catch (err) {
          dispatch(clearUser());
        }
      },
    );

    return () => unsubscribe();
  }, [dispatch]);
}

export default useAuth;
