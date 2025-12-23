import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import "./tests.scss"
import { fetchCategories } from "../../redux/slices/categories"
import { Link } from "react-router-dom"
const TestPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])
    const { categories } = useAppSelector(state => state.categories)
    return <div className="tests-page">
        <div className="tests-wrapper">
            {categories.map((c) => (
                <div className="test-array">{c.name}
                    <Link to={`/tests/${c.id}`}>
                        <button className="btn btn-primary">Take the test</button>
                    </Link>
                </div>
            ))}

        </div>
    </div>
}

export default TestPage