import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { useDispatch } from "react-redux";

function useAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(currentUser);
    });

    return () => unsubscribe();
  }, []);
}
export default useAuth;
