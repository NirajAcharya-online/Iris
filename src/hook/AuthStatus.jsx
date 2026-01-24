import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/firebaseSetup";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

function useAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            isVerified: currentUser.emailVerified,
            createdAt: currentUser.metadata.createdAt,
            username: currentUser.displayName,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, []);
}
export default useAuth;
