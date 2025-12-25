import { useParams, useNavigate } from "react-router-dom";
import "./test.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchTests } from "../../redux/slices/tests";
import type { Test } from "../../types";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.con";
import TestArray from "./test-array";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.auth/firebase.auth";

const Test1 = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { tests } = useAppSelector(state => state.tests);

    const [questions, setQuestions] = useState<Test[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [results, setResults] = useState<{ [key: number]: "correct" | "wrong" }>({});
    const [index, setIndex] = useState(0);

    const [started, setStarted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const TOTAL_TIME = 200;
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUserId(user ? user.uid : null);
        });
    }, []);

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    const fetchTestsByCategory = async () => {
        const snapshot = await getDocs(collection(db, "tests"));
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Test[];

        setQuestions(data.filter(q => q.categoryName === id));
    };

    useEffect(() => {
        fetchTestsByCategory();
    }, [id, tests]);

    useEffect(() => {
        if (!started || submitted) return;

        if (timeLeft <= 0) {
            submitTest();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, started, submitted]);

    const checkAnswers = () => {
        const newResults: { [key: number]: "correct" | "wrong" } = {};

        for (let i = 0; i < questions.length; i++) {
            const userAnswer = answers[i] ? answers[i].trim().toUpperCase() : "";
            const correctAnswer = questions[i].correctAnswer ? questions[i].correctAnswer.trim().toUpperCase() : "";
            newResults[i] = userAnswer === correctAnswer ? "correct" : "wrong";
        }

        setResults(newResults);
        setSubmitted(true);
    };

    const submitTest = async () => {
        if (submitted) return;

        checkAnswers();

        const correct = questions.filter(
            (q, i) => answers[i]?.trim().toUpperCase() === q.correctAnswer?.trim().toUpperCase()
        ).length;

        await addDoc(collection(db, "results"), {
            testId: id,
            userId,
            result: correct,
            timeSpent: TOTAL_TIME - timeLeft,
            createdAt: Date.now(),
        });
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const questionButtons = questions.map((q, n) => {
        let btnClass = "btn btn-outline-dark";
        if (n === index) btnClass = "btn btn-dark text-white";

        // After submission, color buttons based on results
        if (submitted && results[n]) {
            btnClass = results[n] === "correct" ? "btn btn-success text-white" : "btn btn-danger text-white";
        }

        return { id: q.id, number: n + 1, className: btnClass, index: n };
    });


    return (
        <div className="test-page">
            <div className="test-header">
                <button className="back-btn" onClick={() => navigate("/tests")}>
                    ← Testlarga qaytish
                </button>

                {!started && !submitted && (
                    <button className="start-btn" onClick={() => setStarted(true)}>
                        Testni boshlash
                    </button>
                )}
            </div>

            {started && (
                <div className="timer">
                    ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
                </div>
            )}

            <div className={!started ? "locked" : ""}>
                <TestArray
                    questions={questions}
                    index={index}
                    answers={answers}
                    setAnswers={setAnswers}
                    submitted={submitted}
                    started={started}
                />
            </div>

            <div className="buttons-wrapper d-flex gap-2">
                {questionButtons.map(btn => (
                    <button
                        key={btn.id}
                        disabled={!started}
                        onClick={() => setIndex(btn.index)}
                        className={btn.className}
                    >
                        {btn.number}
                    </button>
                ))}
            </div>
            {started && !submitted && (
                <button className="btn btn-dark mt-3" onClick={submitTest}>
                    Testni yakunlash
                </button>
            )}
        </div>
    );
};

export default Test1;
