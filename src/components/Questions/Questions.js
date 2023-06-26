import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, Button, Card, Typography} from "@mui/material";
import {decode} from "html-entities";
import {Loading} from "../Loading/Loading";


const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {

    const location = useLocation();
    const {state: response, load: loading} = location;

    const navigate = useNavigate();

    const [questionIndex, setQuestionIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);


    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    useEffect(() => {
        if (response?.results.length) {
            const question = response.results[questionIndex];
            let answers = [...question.incorrect_answers];
            answers.splice(
                getRandomInt(question.incorrect_answers.length),
                0,
                question.correct_answer
            );
            setOptions(answers);
        }
    }, [response, questionIndex]);


    if (loading) {
        return <Loading/>
    }

    const handleClickAnswer = (e) => {
        const question = response.results[questionIndex];
        if (e.target.textContent === question.correct_answer) {
            setScore(score + 1);
            const correctAnswerCount = Number(localStorage.getItem("correctlyAnsweredScore") || 0) + 1;
            localStorage.setItem("correctlyAnsweredScore", correctAnswerCount);
        } else {
            const wrongAnswerCount = Number(localStorage.getItem("wrongAnsweredScore") || 0) + 1;
            localStorage.setItem("wrongAnsweredScore", wrongAnswerCount);
        }

        if (questionIndex + 1 < response.results.length) {
            setQuestionIndex(questionIndex + 1);
        } else {
            navigate("/finish", {state: {score, response, timer}});
            const quizzesFinished = Number(localStorage.getItem("quizzesFinished") || 0) + 1;
            localStorage.setItem("quizzesFinished", quizzesFinished);
        }
    };

    return (
        <Card variant="outlined" sx={{paddingBottom: "10px"}}>
            <Box p={2}>
                <Typography variant="h4">
                    Question {questionIndex + 1} / {response.results.length}
                </Typography>
                <Typography mt={3} variant="body1">
                    {decode(response.results[questionIndex].question)}
                </Typography>
                {options.map((data, id) => (
                    <Box mt={2} key={id}>
                        <Button
                            onClick={handleClickAnswer}
                            variant="contained"
                            fullWidth
                        >
                            {decode(data)}
                        </Button>
                    </Box>
                ))}
            </Box>
            <Button onClick={() => navigate("/")} color="error" variant="contained">
                Cancel
            </Button>
        </Card>
    );
};

export {Questions};
