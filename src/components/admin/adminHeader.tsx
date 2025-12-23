import { FiAlignJustify } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminHeader.scss"

type InitialProps = {
  handleToggle: (val: boolean) => void;
};
const HeaderAdmin = ({ handleToggle }: InitialProps) => {
  return (
    <div className="w-100 p-3 d-flex justify-content-between align-items-center! life">
      <div className="d-flex align-items-center! w-100 gap-2">
        <FiAlignJustify
          onClick={() => handleToggle(true)}
          className="text-primary"
          size={35}
        />
        <h3 className="text-primary mt-1"> Admin</h3>
      </div>
    </div>
  );
};

export default HeaderAdmin;
