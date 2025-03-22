import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { firebaseAuth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/features/authSlice";
import { firestore } from "../config/firebase"; // Firestore instance import
import { useNavigate } from "react-router-dom";
const useAuthListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async (user) => {
      if (user) {
        try {
          const userDocRef = doc(firestore, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            dispatch(setUser(userDocSnap.data()));
          } else {
            dispatch(setUser(null));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        dispatch(clearUser());
        navigate("/");
      }
    };

    // Firebase auth listener
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      fetchUser(user);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch]);

  return null;
};

export default useAuthListener;
