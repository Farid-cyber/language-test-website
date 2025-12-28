import { useEffect,  useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import "./tests.scss"
import { fetchCategories } from "../../redux/slices/categories"
// import { Link } from "react-router-dom"
import Category2 from "./category"
import { useNavigate } from "react-router-dom"
// import type { Result } from "../../types"
// import { onAuthStateChanged } from "firebase/auth"
// import { auth } from "../../firebase.auth/firebase.auth"
// import { collection, getDocs } from "firebase/firestore"
// import { db } from "../../firebase/firebase.con"
const TestPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const [results, setResults] = useState<Result[]>([])
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])
    // const fetchResults = async () => {
    //     try {
    //         const snapshot = await getDocs(collection(db, "results"));
    //         const data = snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         })) as Result[];
    //         console.log(data);
    //         const filtered = data.filter(r => r.userId === userId);
    //         console.log(filtered);
    //         setResults([...filtered])
    //         console.log(results);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchResults()
    // }, [])

    const { categories } = useAppSelector(state => state.categories)
    return <div className="tests-page">
        <div className="test-header">
            <button className="back-btn" onClick={() => navigate("/")}>
                ← Bosh sahifaga qaytish
            </button>
        </div>
        <div className="tests-wrapper">
            {categories.map((c) => (
                <Category2 category={c} />
            ))}
        </div>
    </div>
}

export default TestPage