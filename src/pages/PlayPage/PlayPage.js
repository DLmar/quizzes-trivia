import {useLocation, useNavigate} from "react-router-dom";
import {Button, CardContent} from "@mui/material";

import useAxios from "../../hooks/useAxios";
import {Loading} from "../../components";

import './PlayPage.css'


const PlayPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {state: quiz} = location;
    const categoryId = quiz.id

    const {response, loading} = useAxios({url: `/api.php?amount=50&category=${categoryId}`});

    if (loading) {
        return <Loading/>
    }

    const handleStartQuiz = () => {
        navigate(`/play/${categoryId}/questions`, {state: response, load: loading});
    };


    return (
        <CardContent className='card'>
            <h2>Category: {quiz.name}</h2>
            <p>Amount of Questions: {response.results.length}</p>
            <Button onClick={handleStartQuiz} variant='contained'>Play</Button>
        </CardContent>
    );
};

export {PlayPage};
