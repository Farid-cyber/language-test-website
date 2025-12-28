import { useEffect, useState } from "react";
import Rodal from "rodal";
import type { Category } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addCategory, fetchCategories } from "../../redux/slices/categories";
import 'rodal/lib/rodal.css';
import "./adminCategories.scss"
// import "bootstrap/dist/css/bootstrap.min.css";



const AdminCategories = () => {
  const [open, setOpen] = useState(false)
  const { categories } = useAppSelector(state => state.categories)
  // const dispatch= useAppDispatch()
  const [categoryForm, setCategoryForm] = useState<Category>({
    name: "",
    type: "",
    language: ""
  })

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleSave = async () => {
    dispatch(addCategory({ ...categoryForm, createdAt: Date.now() }))
    setCategoryForm({
      name: "",
      type: "",
      language: ""
    })
    setOpen(false)
  }

  return <div className="categories-page-container">
    <div className="top-header">
      <h2>All Categories</h2>
      <button onClick={() => setOpen(true)} className="add-category-btn">
        + Add category
      </button>
    </div>
    <div className="categories-list">
      {categories.map((cat) => (
        <div className="category-card" key={cat.id}>
          <h4>{cat.name}</h4>
          <span className="cat-type">{cat.type}</span>
          <span className="cat-lang">{cat.language}</span>
        </div>
      ))}

    </div>
    {/* <div> */}
    <Rodal
      className="rodal"
      visible={open}
      onClose={() => {
        setOpen(false)
      }}
      // animation="fade"
      customStyles={{
        width: "350px",
        height: "max-content",
      }}
    >
      <h4>Add Category</h4>

      <input
        className="form-control mb-2"
        placeholder="Category name"
        value={categoryForm.name}
        onChange={(e) =>
          setCategoryForm({ ...categoryForm, name: e.target.value })
        }
      />
      <input
        className="form-control mb-2"
        placeholder="Category type"
        value={categoryForm.type}
        onChange={(e) =>
          setCategoryForm({ ...categoryForm, type: e.target.value })
        }
      />
      <input
        className="form-control mb-2"
        placeholder="Category language"
        value={categoryForm.language}
        onChange={(e) =>
          setCategoryForm({ ...categoryForm, language: e.target.value })
        }
      />
      <button onClick={handleSave} className="btn btn-success w-100 mt-2">
        Save
      </button>
    </Rodal>
    {/* </div> */}
  </div>;
};

export default AdminCategories;

