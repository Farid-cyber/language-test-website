import { useEffect, useState } from "react";
import "./adminTests.scss"
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import type { Answers } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchCategories } from "../../redux/slices/categories";
import { addTests } from "../../redux/slices/tests";
// import type { Answers } from "../../types";


const AdminTests = () => {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [categoryName, setCategoryName] = useState("")

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categories)
  useEffect(() => { dispatch(fetchCategories()) }, [dispatch])
  const [answerForm, setAnswerForm] = useState<Answers>({
    a: "",
    b: "",
    c: "",
    d: ""
  })

  const handleSave = () => {
    const questionObj = {
      question,
      correctAnswer,
      categoryName,
      options: answerForm
    }
    dispatch(addTests(questionObj))
    setOpen(false)
    setAnswerForm({
      a: "",
      b: "",
      c: "",
      d: ""
    })
    setCategoryName("")
    setCorrectAnswer("")
    setQuestion("")
  }

  return <div className="tests-wrapper">
    <div className="d-flex justify-content-end w-100"><button onClick={() => setOpen(true)} className="btn btn-primary">+ Add test</button></div>
    <Rodal
      className="rodal"
      visible={open}
      onClose={() => {
        setOpen(false)
      }}
      customStyles={{
        width: "350px",
        height: "max-content",
      }}
    >
      <div className="mt-4 rodal-body-scroll">
        <p>Test kiriting</p>
        <div>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} className="form-control" type="text" placeholder="question..." />
          <div className="d-flex gap-2 align-items-center mt-2">
            <p>A</p>
            <input value={answerForm.a} onChange={(e) => setAnswerForm({ ...answerForm, a: e.target.value })} type="text" className="form-control" />
          </div>
          <div className="d-flex gap-2 align-items-center mt-2">
            <p>B</p>
            <input value={answerForm.b} onChange={(e) => setAnswerForm({ ...answerForm, b: e.target.value })} type="text" className="form-control" />
          </div>
          <div className="d-flex gap-2 align-items-center mt-2">
            <p>C</p>
            <input value={answerForm.c} onChange={(e) => setAnswerForm({ ...answerForm, c: e.target.value })} type="text" className="form-control" />
          </div>
          <div className="d-flex gap-2 align-items-center mt-2">
            <p>D</p>
            <input value={answerForm.d} onChange={(e) => setAnswerForm({ ...answerForm, d: e.target.value })} type="text" className="form-control" />
          </div>
          <input value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="form-control mt-2" type="text" placeholder="correct option..." />
          <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-select mt-2">
            <option value="" disabled selected >Select the category Name</option>
            {categories.map((c) => (
              <option value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSave}
          className="comment-button btn adding-image w-full btn-primary mt-1 w-100"
        >
          Save
        </button>
      </div>
    </Rodal>
  </div>;
};

export default AdminTests;
