
import { useParams } from "react-router-dom"
import "./test.scss"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
// import { fetchCategories } from "../../redux/slices/categories";
import { fetchTests } from "../../redux/slices/tests";
import type { Test } from "../../types";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.con";
import TestArray from "./test-array";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.auth/firebase.auth";

const Test1 = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState<Test[]>([])
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [userId, setUserId] = useState<string | null>(null)
    // const userId = localStorage.getItem("token")

    const { tests } = useAppSelector(state => state.tests)
    const dispatch = useAppDispatch();
    const [index, setIndex] = useState(0)


    useEffect(() => {
        dispatch(fetchTests())
    }, [dispatch])


    const fetchTestsByCategory = async () => {
        try {
            const snapshot = await getDocs(collection(db, "tests"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Test[];
            const life = data.filter(c => c.categoryName == id)
            setQuestions([...life])

        } catch (error) {
            console.log(error);
        }
    }

    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    useEffect(() => {
        fetchTestsByCategory()
    }, [id, tests])

    const TOTAL_TIME = 200; // 3 minutes 20 seconds

    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    // const [startedAt, setStartedAt] = useState<number | null>(Date.now());
    // const [setFinishedAt] = useState<number | null>(null);


    const [results, setResults] = useState<{ [key: number]: "correct" | "wrong" }>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) return;
        if (timeLeft <= 0) {
            submitTest(); // auto submit
            return;
        }
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, submitted, correctAnswers])

    const checkAnswers = () => {
        const newResults: { [key: number]: "correct" | "wrong" } = {};

        let correct = 0;
        let wrong = 0;

        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === questions[i].correctAnswer) {
                newResults[i] = "correct";
                correct++;
            } else {
                newResults[i] = "wrong";
                wrong++;
            }
        }
        // console.log(correct);
        // setCorrectAnswers(correct)
        // console.log(correctAnswers);
        setResults(newResults);
        setSubmitted(true);
    };

    const check = () => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setUserId(user.uid)
            } else {
                setUserId(null)
            }
        });
    };


    useEffect(() => {
        check();
    }, []);

    // console.log(userId);

    const submitTest = async () => {
        setSubmitted(true);
        // setFinishedAt(Date.now()); // overall finish timestamp
        checkAnswers();
        const timeSpent = 200 - timeLeft;
        let correct = 0;

        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === questions[i].correctAnswer) {
                correct++;
            }
        }

        setCorrectAnswers(correct);
        const resultObj = {
            testId: id,
            userId: userId,
            timeSpent: timeSpent,
            result: correct,
            createdAt: Date.now()
        }
        try {
            const docRef = await addDoc(collection(db, "results"), resultObj);
            console.log({ ...resultObj, id: docRef.id });
            return { ...resultObj, id: docRef.id };
        } catch (e) {
            console.error("Error adding document: ", e);
            throw e;
        }
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return <div>
        <div className="test-page">
            <div className="timer">
                Time Left: {minutes}:{seconds < 10 ? "0" : ""}{seconds}/3:20
            </div>

            <TestArray
                questions={questions}
                index={index}
                answers={answers}
                setAnswers={setAnswers}
                submitted={submitted}
            />
            <div className="buttons-wrapper d-flex gap-2">
                {questions.map((c, n) => (
                    <button key={c.id} onClick={() => setIndex(n)} className={`btn
                        ${n === index ? "btn-dark text-white" : ""}
                        ${results[n] === "correct" ? "btn-success" : ""}
                        ${results[n] === "wrong" ? "btn-danger" : ""}
                        ${results[n] === undefined && answers[n] !== undefined ? "btn-warning" : ""}
                        ${results[n] === undefined && answers[n] === undefined ? "btn-outline-dark" : ""}
                      `}>{n + 1}</button>
                ))}
            </div>
            <button className="btn btn-dark mt-3" onClick={submitTest}>Check</button>
        </div>
    </div>
}

export default Test1