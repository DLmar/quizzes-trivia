import {Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import './QuizCard.css'

const QuizCard = ({ quiz }) => {
    const navigate = useNavigate();
    const handleQuizClick = (quizId, category) => {
        navigate(`/play/${quizId}`, { state: quiz });
    };

    return (
        <div className="card">
            <Button onClick={() => handleQuizClick(quiz.id, quiz.name)}>
                <i>{quiz.name}</i>
            </Button>
        </div>
    );
};

export { QuizCard };
