import {Route, Routes} from "react-router-dom";

import {Box, Container} from "@mui/material";

import {FinishPage, HomePage, PlayPage, StatsPage} from "./pages";
import {Questions} from "./components";

import './App.css'


function App() {
    return (
        <Container className="container" maxWidth="xl">
            <Box className="content">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/play/:quizId" element={<PlayPage/>}/>
                    <Route path="/play/:quizId/questions" element={<Questions/>}/>
                    <Route path="/finish" element={<FinishPage/>}/>
                    <Route path="/stats" element={<StatsPage/>}/>
                </Routes>
            </Box>
        </Container>
    );
}

export default App;
