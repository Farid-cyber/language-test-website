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

  return <div className="p-3">
    <div className="d-flex justify-content-start! w-100">
      <button onClick={() => setOpen(true)} className="btn btn-primary h-25">+ Add category</button>
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

