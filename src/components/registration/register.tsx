import toast, { Toaster } from "react-hot-toast";
import "./register.scss";
import { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hook";
// import { addUser, fetchUsers } from "../../redux/slices/users";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.auth/firebase.auth";
// import type { User } from "../../types";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [emailadress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [fullname, setFullName] = useState("");
  // const { users } = useAppSelector((state) => state.users);
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleEnter = () => {
    // const user = users.find((c) => c.email === emailadress);
    // if (!user) {
    //   toast.error("Iltimos ro'xatdan o'ting");
    // } else {
    //   const password1 = users.find((c) => c.password === password);
    //   if (password1) {
    //     const userId = users.find((c) => c.email === emailadress)!
    //       .id as unknown as string;
    //     console.log(userId);
    //     localStorage.setItem("userId", userId);
    //     router.push("/");
    //   }
    // }
    if (emailadress === "" || password === "") {
      toast.error("Formani to'liq to'ldiring.");
      return;
    }

    if (password.length < 8) {
      toast.error("Parol 8 ta harf yoki raqamdan katta bo'lishi kerak!");
      return;
    }
    signInWithEmailAndPassword(auth, emailadress, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid === "") {
          toast.error("Siz ro'yxatdan o'tmagansiz.");
          return;
        } else {
          toast.success("Siz muvaffaqiyatli kirdingiz");
          if (user.email === "farid@gmail.com") {
            navigate("/");
          } else {
            navigate("/");
            // console.log(user.uid);
          }
        }
      })
      .catch((error) => {
        console.log(error.toString());
        if (
          error.toString() ===
          "FirebaseError: Firebase: Error (auth/invalid-credential)."
        ) {
          toast.error(`${error}`);
        }
      });
  };

  const handleSave = () => {
    // const user = users.find((c) => c.email === emailadress);
    // if (!user) {
    //   toast.error("Iltimos ro'xatdan o'ting");
    // }
    if (emailadress === "" || password === "") {
      toast.error("Formani to'liq to'ldiring.");
      return;
    }

    if (password.length < 8) {
      toast.error("Parol 8 ta harf yoki raqamdan katta bo'lishi kerak!");
      return;
    }
    createUserWithEmailAndPassword(auth, emailadress, password)
      .then((userCredential) => {
        toast.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz");
        const user = userCredential.user;
        console.log(user.displayName);
        setOpen(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error}`);
      });
  };




  return (
    <div className="auth-bg">
      <Toaster position="top-right" />
      <div className="test-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Bosh sahifaga qaytish
        </button>
      </div>
      <div className="auth-card">
        <h2 className="auth-title">
          {open ? "Ro'yxatdan o'tish" : "Akkauntga kirish"}
        </h2>

        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="email@gmail.com"
            value={emailadress}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Parol</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!open ? (
          <>
            <p className="switch" onClick={() => setOpen(true)}>
              Akkauntingiz yo‘qmi? <span>Ro‘yxatdan o‘ting</span>
            </p>
            <button onClick={handleEnter} className="auth-btn">
              Kirish
            </button>
          </>
        ) : (
          <>
            <p className="switch" onClick={() => setOpen(false)}>
              Akkauntga kirish
            </p>
            <button onClick={handleSave} className="auth-btn">
              Ro‘yxatdan o‘tish
            </button>
          </>
        )}
      </div>
    </div>
  );

};

export default Register;
