import { Link } from "react-router-dom";
import type { Category } from "../../types";

type InitialProps = {
  category: Category;
};

const Category2 = ({ category }: InitialProps) => {
  return (
    <div className="test-card">
      <h2>{category.name}</h2>
      <p>{category.name} bo‘yicha savollar to‘plami</p>

      <Link to={`/tests/${category.id}`}>
        <button className="take-test-btn">Testni boshlash</button>
      </Link>
    </div>
  );
};

export default Category2;
