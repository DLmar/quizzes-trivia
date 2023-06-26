import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { formatTime } from "../../constants/format";

const StatsPage = () => {
    const navigate = useNavigate();
    const [correctlyAnsweredScore, setCorrectlyAnsweredScore] = useState(
        localStorage.getItem("correctlyAnsweredScore") || 0
    );
    const [wrongAnsweredScore, setWrongAnsweredScore] = useState(
        localStorage.getItem("wrongAnsweredScore") || 0
    );
    const [quizzesFinished, setQuizzesFinished] = useState(
        localStorage.getItem("quizzesFinished") || 0
    );
    const [allQuestions, setAllQuestions] = useState(0);
    const [averageTime, setAverageTime] = useState(0);

    const handleClearStats = () => {
        localStorage.setItem("correctlyAnsweredScore", 0);
        localStorage.setItem("wrongAnsweredScore", 0);
        localStorage.setItem("quizzesFinished", 0);
        setCorrectlyAnsweredScore(0);
        setWrongAnsweredScore(0);
        setQuizzesFinished(0);
        setAllQuestions(0);
        setAverageTime(0);
    };

    useEffect(() => {
        const totalQuestions = +correctlyAnsweredScore + +wrongAnsweredScore;
        setAllQuestions(totalQuestions);
    }, [correctlyAnsweredScore, wrongAnsweredScore]);

    useEffect(() => {
        const storedTotalTime = Number(localStorage.getItem("totalTime") || 0);
        const average = quizzesFinished > 0 ? storedTotalTime / quizzesFinished : 0;
        setAverageTime(average);
    }, [quizzesFinished]);

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                    Stats:
                </Typography>
                <Typography variant="h4" align="center" gutterBottom>
                    Quizzes finished: {quizzesFinished}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    All questions: {allQuestions}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    Correctly Answered: {correctlyAnsweredScore}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    Wrong Answered: {wrongAnsweredScore}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    Average Time: {formatTime(averageTime)}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <Button onClick={handleClearStats} variant="contained" color="error">
                        Clear Stats
                    </Button>
                    <Button onClick={() => navigate("/")} variant="contained" color="success">
                        Home
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export { StatsPage };
