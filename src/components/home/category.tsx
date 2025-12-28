import { Link } from "react-router-dom";
import type { Category} from "../../types";
import { useEffect, useState } from "react";

type InitialProps = {
  category: Category;
  // results: Result[]
};

const Category2 = ({ category }: InitialProps) => {
  const [label, setLabel] = useState<string | null>(null);



  // const checkingDone = async () => {
  //   const found = results.find(c => c.testId === category.id)?.testId;
  //   if (found) {
  //     setDone(found)
  //   } else {
  //     setDone(null)
  //   }
  // };

  useEffect(() => {
    const created = Number(category.createdAt);
    const isNew = Date.now() - created <= 86400000 * 2; // 2 days
    setLabel(isNew ? "new" : "old");
    // fetchResults()
    // checkingDone()
  }, [category]);



  return (
    <div className="test-card">
      <div className="w-100 d-flex h-25">
        {label === "new" ? <button className="label">New</button> : ""}
      </div>
      <h2>{category.name}</h2>
      <p>{category.name} bo‘yicha savollar to‘plami</p>
      <Link to={`/tests/${category.id}`}>
        <button className="take-test-btn">Testni boshlash</button>
      </Link>
    </div>
  );
};

export default Category2;
