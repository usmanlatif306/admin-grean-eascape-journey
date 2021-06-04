import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isOrder, setIsOrder] = useState(false);
  const [plans, setPlans] = useState([]);
  const [cities, setCities] = useState([]);
  const [isCity, setIsCity] = useState(false);
  const [isPlan, setIsPlan] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [admin, setAdmin] = useState(null);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  // For getting orders from database
  useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("orders")
        .orderBy("createdAt", "desc")
        .get();
      setOrders(data.docs.map((order) => ({ ...order.data(), id: order.id })));
    };
    fetchData();
  }, [isOrder]);
  // For getting plans from database
  useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("plans")
        .orderBy("createdAt", "asc")
        .get();
      setPlans(data.docs.map((plan) => ({ ...plan.data(), id: plan.id })));
    };
    fetchData();
  }, [isPlan]);
  // For getting plan cities from database
  useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("cities")
        .orderBy("createdAt", "asc")
        .get();
      setCities(data.docs.map((city) => ({ ...city.data(), id: city.id })));
    };
    fetchData();
  }, [isCity]);
  // For getting users from database
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("profile").get();
      setUsers(data.docs.map((user) => ({ ...user.data(), id: user.id })));
    };
    fetchData();
  }, [isUser]);
  // For getting Admin profile from database
  useEffect(() => {
    if (currentUser) {
      var docRef = db.collection("admin").doc(currentUser.uid);
      docRef
        .get()
        .then((doc) => {
          // console.log(doc.data());
          setAdmin(doc.data());
        })
        .catch((error) => {
          console.log("Error getting User:", error);
        });
    }
  }, [currentUser]);

  const value = {
    currentUser,
    orders,
    setOrders,
    setIsOrder,
    plans,
    setPlans,
    setIsPlan,
    cities,
    setCities,
    setIsCity,
    users,
    setUsers,
    setIsUser,
    admin,
    setAdmin,
    signup,
    login,
    resetPassword,
    updatePassword,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
