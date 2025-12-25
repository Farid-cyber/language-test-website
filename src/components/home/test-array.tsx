import type { Test } from "../../types";

type Props = {
    index: number;
    questions: Test[];
    answers: { [questionIndex: number]: string };
    setAnswers: any;
    submitted: boolean;
    started: boolean;
};

const TestArray = ({ index, questions, answers, setAnswers, submitted, started }: Props) => {
    const selectedAnswer = answers[index];
    const correctAnswer = questions[index]?.correctAnswer;

    const handleSelect = (key: string) => {
        if (!started || submitted) return;

        setAnswers((prev: any) => ({
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

            <div className={`answers-array ${!started ? "disabled" : ""}`}>
                {optionKeys.map((key) => {
                    let cls = "answer";
                    if (submitted) {
                        if (key.toUpperCase() === correctAnswer?.trim().toUpperCase()) cls = "answer correct";
                        else if (selectedAnswer === key) cls = "answer wrong";
                    } else if (selectedAnswer === key) cls = "answer selected";

                    return (
                        <div key={key} className={cls} onClick={() => handleSelect(key)}>
                            <h4>{key.toUpperCase()}</h4>
                            <h5>{questions[index]?.options[key]}</h5>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TestArray;
