import type { Test } from "../../types";

type Props = {
    index: number;
    questions: Test[];
    answers: {
        [questionIndex: number]: string;
    };
    setAnswers: (
        value:
            | {
                [questionIndex: number]: string;
            }
            | ((
                prev: {
                    [questionIndex: number]: string;
                }
            ) => {
                [questionIndex: number]: string;
            })
    ) => void;
    submitted: boolean;
};

const TestArray = ({ index, questions, answers, setAnswers, submitted }: Props) => {
    const selectedAnswer = answers[index];
    const correctAnswer = questions[index]?.correctAnswer;

    const handleSelect = (key: string) => {
        if (submitted) return;

        setAnswers((prev) => ({
            ...prev,
            [index]: key,
        }));
    };

    const optionKeys = ["a", "b", "c", "d"] as const;

    return (
        <div className="test-wrapper">
            <div className="question">
                <p>{index + 1}.</p>
                <p>{questions[index]?.question}</p>
            </div>
            <div className="answers-array">
                {optionKeys.map((key) => (
                    <div
                        key={key}
                        className={
                            submitted
                                ? key === correctAnswer
                                    ? "answer correct"
                                    : selectedAnswer === key
                                        ? "answer wrong"
                                        : "answer"
                                : selectedAnswer === key
                                    ? "answer selected"
                                    : "answer"
                        }
                        onClick={() => handleSelect(key)}
                    >
                        <h4>{key.toUpperCase()}</h4>
                        <h5>{questions[index]?.options[key]}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestArray;
