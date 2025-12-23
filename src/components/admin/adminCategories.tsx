import { useEffect, useState } from "react";
import Rodal from "rodal";
import type { Category } from "../../types";
import { useAppDispatch } from "../../redux/hook";
import { addCategory, fetchCategories } from "../../redux/slices/categories";
import 'rodal/lib/rodal.css';
import "./adminCategories.scss"
// import "bootstrap/dist/css/bootstrap.min.css";



const AdminCategories = () => {
  const [open, setOpen] = useState(false)
  const [categoryForm, setCategoryForm] = useState<Category>({
    name: "",
    type: ""
  })

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleSave = async () => {
    dispatch(addCategory(categoryForm))
    setCategoryForm({
      name: "",
      type: ""
    })
    setOpen(false)
  }

  return <div className="tests-wrapper">
    <div className="d-flex justify-content-end w-100">
      <button onClick={() => setOpen(true)} className="btn btn-primary">+ Add category</button>
    </div>
    <div>
      <Rodal
        visible={open}
        onClose={() => setOpen(false)}
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
        <div className="rodal-inside mt-4">
          <select value={categoryForm.type}
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, type: e.target.value })
            }>
            <option value="" disabled selected>select type</option>
            <option value="vocabulary">Vocabulary</option>
          </select>
        </div>
        <button onClick={handleSave} className="btn btn-success">
          Save
        </button>
      </Rodal>
    </div>
  </div>;
};

export default AdminCategories;

