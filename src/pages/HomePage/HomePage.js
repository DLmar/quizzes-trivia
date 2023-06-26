import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {Box, Button, Typography} from "@mui/material";

import useAxios from "../../hooks/useAxios";
import {QuizCard} from "../../components";
import {Loading} from "../../components";

import './HomePage.css'

const HomePage = () => {
    const { response, loading } = useAxios({ url: "/api_category.php" });
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (response?.trivia_categories) {
            const randomQuizzes = randomArray(response.trivia_categories);
            const selectedQuizzes = randomQuizzes.slice(0, 10);
            setQuizzes(selectedQuizzes);
        }
    }, [response]);


    const handleLuckyClick = () => {
        const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        navigate(`/play/${randomQuiz.id}`, { state: randomQuiz });
    };

    if (loading) { return <Loading /> }

    return (
        <>
            <Typography variant="h4" mb={2}>Choose some quiz!</Typography>
            <Box className="btns">
                <Button onClick={handleLuckyClick} color="success" variant={"contained"}>I'm Lucky</Button>
                <Button onClick={() => navigate('/stats')} color="info" variant={"contained"}>Stats</Button>
            </Box>
            <div className="quizzesList">
                {quizzes.map((quiz, index) => (
                    <QuizCard quiz={quiz} key={index} />
                ))}
            </div>
        </>
    );
};

export { HomePage };

function randomArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
