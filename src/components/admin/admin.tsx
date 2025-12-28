import { Outlet } from "react-router-dom";
// import Sidebar from "./sidebar";
// import HeaderAdmin from "./headerAdmin";
import { useState } from "react";
// import { useState } from "react";
import "./admin.scss";
import HeaderAdmin from "./adminHeader";
import Sidebar from "./sidebar";

const Admin = () => {
  const [visibility, setVisibility] = useState(false);

  const handleToggle = () => {
    if (visibility === true) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };
  return (
    <div className="w-100 jjjj">
      <HeaderAdmin handleToggle={handleToggle} />
      <div className="w-100 d-flex">
        <div className="side">
          <Sidebar visibility={visibility} />
        </div>
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
