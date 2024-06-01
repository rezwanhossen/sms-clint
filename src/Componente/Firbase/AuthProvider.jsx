import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./firbase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googlepro = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loding, setloding] = useState(true);

  //user create
  const creatuser = (email, password) => {
    setloding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //updat profil
  const updatprofil = (name, img) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: img,
    });
  };
  //login user
  const login = (email, password) => {
    setloding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google login
  const googlelogin = () => {
    setloding(true);
    return signInWithPopup(auth, googlepro);
  };
  // logout
  const logout = async () => {
    setuser(null);

    signOut(auth);
  };

  // Get token from server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  };

  // onAuth States cxhange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setuser(user);
      if (user) {
        getToken(user.email);
      }
      setloding(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const allvalue = {
    user,
    creatuser,
    updatprofil,
    login,
    googlelogin,
    logout,
    setuser,
    loding,
  };
  return (
    <AuthContext.Provider value={allvalue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
