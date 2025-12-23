import { useEffect, useState } from "react";
import "./header.scss";
// import { useAppDispatch, useAppSelector } from "../../redux/hook";
// import { fetchUsers } from "../../redux/slices/users";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.auth/firebase.auth";

const Home = () => {
  const navigate = useNavigate();


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
    check();
  }, []);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  // useEffect(() => {
  //   const userToken = localStorage.getItem("token");
  //   setUserId(userToken);
  // }, [userId]);

  // useEffect(() => {
  //   const findedUser = users.find((c) => c.id === userId?.toString())?.email;
  //   if (!findedUser) {
  //     setUsertype(null);
  //   } else if (findedUser === "farid@gmail.com") {
  //     setUsertype("admin");
  //   } else {
  //     setUsertype("user");
  //   }
  // }, [usertype, users]);

  return (
    <div className="header">
      <h1 onClick={() => navigate("/tests")}> Welcome our page</h1>
      {user === "admin" ? (
        <>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/tests")}
          >
            Admin
          </button>
        </>
      ) : user === "user" ? (
        <>
          <button
            onClick={() => navigate("/myAccount")}
            className="btn btn-primary">My Profile</button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/registration")}
            className="btn btn-primary">Sign in</button>
        </>
      )}
    </div>
  );
};

export default Home;
