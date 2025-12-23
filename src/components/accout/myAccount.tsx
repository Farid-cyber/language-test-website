import { useEffect, useState } from "react"
import type { Result } from "../../types"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebase.con"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../firebase.auth/firebase.auth"
import { useNavigate } from "react-router-dom"
import ResultCard from "./resultCard"

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
        <div>
            <h2>My Results</h2>
            <div className="d-flex border gap-2 flex-wrap p-3">
                {results.length === 0 ? (
                    <p>No tests completed yet</p>
                ) : (
                    results.map((r) => (
                        <ResultCard userId={r.userId} timeSpent={Number(r.timeSpent)} testId={r.testId} totalQuestions={10} createdAt={r.createdAt} correctAnswers={Number(r.result)} />
                    ))
                )}
            </div>
            <div className="d-flex w-100 p-3 justify-content-end">
                <button onClick={logOut} className="btn btn-primary">Log out</button>
            </div>
        </div>
    )
}

export default MyAccount
