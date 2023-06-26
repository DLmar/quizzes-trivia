import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {Box, Button, Card, CardContent, Typography} from "@mui/material";

import {formatTime} from "../../constants/format";

const FinishPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {state: {score, response, timer}} = location;

    formatTime(timer)

    useEffect(() => {
        localStorage.setItem("totalTime", timer);
    }, [timer]);

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                    Quiz Finished!
                </Typography>
                <Typography variant="body1" align="center">
                    <Typography>Congratulations on completing the quiz!</Typography>
                    <Typography>Here are your results:</Typography>
                </Typography>
                <Box display="flex" justifyContent="center" mb={2} mt={4}>
                    <Typography variant="h6" align="center">
                        Final Score:
                    </Typography>
                    <Typography variant="h6" color="primary" align="center" ml={1}>
                        {score} / {response.results.length}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" mb={2} mt={4}>
                    <Typography variant="h6" align="center">
                        Your time:
                    </Typography>
                    <Typography variant="h6" color="primary" align="center" ml={1}>
                        {formatTime(timer)}
                    </Typography>
                </Box>
                <Button onClick={() => navigate("/")} color="success" variant="contained">
                    Home
                </Button>
            </CardContent>
        </Card>
    );
};

export {FinishPage};
