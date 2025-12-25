import { useEffect, useState } from "react";
import "./header.scss";
// import { useAppDispatch, useAppSelector } from "../../redux/hook";
// import { fetchUsers } from "../../redux/slices/users";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.auth/firebase.auth";
import toast, { Toaster } from "react-hot-toast";

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


  const navTo = () => {
    if (user === null) {
      toast.error("Birinchi bo'lib ro'yxatdan o'ting")
      return
    } else {
      navigate("/tests")
    }
  }
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
    <div className="home">
      <div><Toaster position="top-right"
        reverseOrder={false} /></div>
      <header className="header">
        <h1 onClick={() => navigate("/")}>DE Nemis tili test platformasi</h1>

        <div className="actions">
          {user === "admin" ? (
            <>
              <button
                className=""
                onClick={() => navigate("/admin/tests")}
              >
                Admin
              </button>
            </>
          ) : user === "user" ? (
            <>
              <button
                onClick={() => navigate("/myAccount")}
                className="btn btn-primary">Mening sahifam</button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/registration")}
                className="btn btn-primary">Kirish</button>
            </>
          )}
        </div >
      </header >

      <section className="hero">
        <div className="hero-card">
          <h2>Xush kelibsiz!</h2>
          <p>A1 darajadagi testni boshlang va o‘zingizni sinab ko‘ring.</p>
          <button onClick={navTo} className="btn btn-warning">Testni boshlash</button>
        </div>
      </section>
    </div >

  );
};

export default Home;
