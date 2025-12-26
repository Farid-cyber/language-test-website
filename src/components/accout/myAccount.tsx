import { useEffect, useState } from "react"
import type { Result } from "../../types"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebase.con"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../firebase.auth/firebase.auth"
import { useNavigate } from "react-router-dom"
import ResultCard from "./resultCard"
import "./myAccount.scss"

const MyAccount = () => {
    const [results, setResults] = useState<Result[]>([])
    const [userId, setUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
            } else {
                setUserId(null)
                setResults([])
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (!userId) return

        const fetchResults = async () => {
            try {
                const q = query(
                    collection(db, "results"),
                    where("userId", "==", userId)
                )

                const snapshot = await getDocs(q)

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Result[]

                setResults(data)
            } catch (error) {
                console.error("Failed to fetch results:", error)
            }
        }

        fetchResults()
    }, [userId])


    const logOut = () => {
        // console.log(auth);
        localStorage.removeItem("userId");
        signOut(auth)
            .then(() => {
                console.log("// Sign-out successful.");
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (loading) return <div>Loading...</div>

    return (
        <div className="my-account-page">
            <div className="test-header">
                <button className="back-btn" onClick={() => navigate("/")}>
                    ← Bosh sahifaga qaytish
                </button>
            </div>
            <h2>Mening natijalarim</h2>

            <div className="results-wrapper">
                {results.length === 0 ? (
                    <p>Hozircha testlar bajarilmagan</p>
                ) : (
                    results.map((r) => (
                        <ResultCard
                            key={r.id}
                            userId={r.userId}
                            timeSpent={Number(r.timeSpent)}
                            testId={r.testId}
                            totalQuestions={10}
                            createdAt={r.createdAt}
                            correctAnswers={Number(r.result)}
                        />
                    ))
                )}
            </div>

            <button onClick={logOut} className="logout-btn">Chiqish</button>
        </div>
    )
}

export default MyAccount
