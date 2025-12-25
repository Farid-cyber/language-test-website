import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import "./tests.scss"
import { fetchCategories } from "../../redux/slices/categories"
// import { Link } from "react-router-dom"
import Category from "./category"
import { useNavigate } from "react-router-dom"
const TestPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])
    const { categories } = useAppSelector(state => state.categories)
    return <div className="tests-page">
        <div className="test-header">
            <button className="back-btn" onClick={() => navigate("/")}>
                ← Bosh sahifaga qaytish
            </button>
        </div>
        <div className="tests-wrapper">
            {categories.map((c) => (
                <Category category={c} />
            ))}
        </div>
    </div>
}

export default TestPage