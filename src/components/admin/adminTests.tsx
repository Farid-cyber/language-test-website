import { useEffect, useState } from "react";
import "./adminTests.scss"
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import type { Answers } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchCategories } from "../../redux/slices/categories";
import { addTests, fetchTests } from "../../redux/slices/tests";
// import type { Answers } from "../../types";


const AdminTests = () => {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [categoryName, setCategoryName] = useState("")

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categories)
  const { tests } = useAppSelector(state => state.tests)


  useEffect(() => { dispatch(fetchCategories()), dispatch(fetchTests()) }, [dispatch])
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

  return (
    <div className="tests-page-container">
      <div className="top-header">
        <h2>All Tests</h2>
        <button onClick={() => setOpen(true)} className="add-test-btn">+ Add test</button>
      </div>

      <div className="tests-list">
        {tests && tests.length > 0 ? (
          tests.map((t) => (
            <div className="test-card" key={t.id}>
              <h3>{t.question}</h3>

              <div className="options">
                {Object.entries(t.options).map(([key, value]) => (
                  <div
                    key={key}
                    className={`option-box ${key.toLowerCase() === t.correctAnswer.toLowerCase()
                        ? "correct"
                        : ""
                      }`}
                  >
                    <strong>{key.toUpperCase()}:</strong> {value}
                  </div>
                ))}
              </div>

              <span className="category-badge">{t.categoryName}</span>
            </div>
          ))
        ) : (
          <p className="empty-msg">No tests yet — Click “+ Add test” above!</p>
        )}
      </div>

      <Rodal
        className="rodal"
        visible={open}
        onClose={() => setOpen(false)}
        customStyles={{
          width: "350px",
          height: "max-content",
        }}
      >
        <div className="mt-4">
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
              <option value="" disabled>Select the category Name</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
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
    </div>)
};

export default AdminTests;
