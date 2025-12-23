import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AdminTests from "./components/admin/adminTests";
import AdminCategories from "./components/admin/adminCategories";
// import Header from "./components/home/header";
import Home from "./components/home/header";
import Admin from "./components/admin/admin";
import Register from "./components/registration/register";
import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "./redux/hook";
// import { fetchUsers } from "./redux/slices/users";
// import type { User } from "./types";
import TestPage from "./components/home/tests";
// import Test from "./components/home/test";
import Test1 from "./components/home/test";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.auth/firebase.auth";
import MyAccount from "./components/accout/myAccount";
// import Test  from "./components/home/test";
// const API_BASE_URL = "https://69456211ed253f51719b32b0.mockapi.io";

function App() {
  // const [userId, setUserId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // const { users } = useAppSelector((state) => state.users);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const userToken = localStorage.getItem("token");
  //   setUserId(userToken);
  // }, [userId]);

  // const check = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/users`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch users");
  //     }
  //     const data = await response.json();
  //     const findedUser = data.find((c: User) => c.id === userId)?.email;
  //     // console.log(findedUser);
  //     if (!findedUser && location.pathname.startsWith("/admin")) {
  //       navigate("/registration");
  //     }
  //     const isAdmin = findedUser === "farid@gmail.com";
  //     if (!isAdmin && location.pathname.startsWith("/admin")) {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   check();
  // }, [userId, location.pathname]);
  const [user, setUser] = useState<string | null>(null)
  const check = () => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        if (user.email === "admin@gmail.com") {
          setUser("admin")
        } else {
          setUser("user")
        }
      } else if (location.pathname.startsWith("/admin") && !user) {
        navigate("/");
        setUser(null)
      }
    });
  };

  useEffect(() => {
    if (location.pathname.startsWith("/admin") && user === "user") {
      navigate("/")
    } else if (location.pathname.startsWith("/profile") && user === "admin") {
      navigate("/")
    } else if (user === null) {
      navigate("/")
    }
  }, [])

  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/tests" element={<AdminTests />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
        </Route>
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/tests" element={<TestPage />} />
        <Route path="/tests/:id" element={<Test1 />} />
        <Route path="/registration" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
