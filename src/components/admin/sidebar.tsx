import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import "./sidebar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.auth/firebase.auth";
import { SiPytest } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
type InitialProps = {
  visibility: boolean;
};
const Sidebar = ({ visibility }: InitialProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const adminroutes = [
    {
      link: "/admin/tests",
      name: "Tests",
      icon: SiPytest,
    },
    {
      link: "/admin/categories",
      name: "Categories",
      icon: BiCategoryAlt,
    },
    {
      link: "/",
      name: "Home",
      icon: FaHome,
    },
  ];

  // const handleLogOut = () => {
  const handleLogOut = () => {
    // console.log(auth);
    localStorage.removeItem("userId");
    signOut(auth)
      .then(() => {
        console.log("// Sign-out successful.");
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // };


  return (
    <div
      className={`${visibility ? "sidebar2 h-vh! w-100" : "sidebar h-vh! w-100"
        }`}
    >
      <div className="py-2 d-flex flex-column w-100">
        {adminroutes.map((route) => (
          <div
            className={`btn btn-outline-primary ${pathname === route.link ? "btn-primary text-white" : ""
              } w-100 my-2 d-flex align-center py-2 justify-content-center fs-medium`}
            onClick={() => navigate(route.link)}
          >
            <route.icon size={20} className="mx-2" />
            {route.name}
          </div>
        ))}
        <div
          onClick={handleLogOut}
          className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <CiLogout />
          {"Logout"}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
