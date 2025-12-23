import "./resultCard.scss";

type InitailResult = {
    userId: string;
    testId: string;
    createdAt: string;
    timeSpent: number; // seconds
    correctAnswers: number;
    totalQuestions: number;
};

const ResultCard = ({correctAnswers, createdAt, testId, timeSpent, totalQuestions }: InitailResult) => {
    const scorePercent = Math.round(
        (correctAnswers / totalQuestions) * 100
    );

    const avgTimePerQuestion = Math.round(
        timeSpent / totalQuestions
    );

    const speedLabel =
        avgTimePerQuestion <= 20
            ? "Fast ⚡"
            : avgTimePerQuestion <= 40
                ? "Normal 🙂"
                : "Slow 🐢";

    return (
        <div className="result-card">
            <h2>📊 Test Performance</h2>

            <div className="stats">
                <div>
                    <span>Score</span>
                    <strong>{scorePercent}%</strong>
                </div>

                <div>
                    <span>Time Spent</span>
                    <strong>
                        {Math.floor(timeSpent / 60)}:
                        {(timeSpent % 60).toString().padStart(2, "0")}
                    </strong>
                </div>
            </div>

            <div className="progress-wrapper">
                <div className="progress-label">Accuracy</div>
                <div className="progress-bar">
                    <div
                        className={`progress-fill ${scorePercent >= 70 ? "good" : "bad"
                            }`}
                        style={{ width: `${scorePercent}%` }}
                    />
                </div>
                <span className="progress-text">{scorePercent}% correct</span>
            </div>

            <div className="meta">
                <p>
                    <strong>Speed:</strong> {speedLabel}
                </p>
                <p>
                    <strong>Test ID:</strong> {testId}
                </p>
                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default ResultCard;
