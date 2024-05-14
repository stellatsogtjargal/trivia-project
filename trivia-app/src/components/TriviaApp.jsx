import { useEffect, useState } from "react";
import "../index.css"
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const TriviaApp = () => {
    const theme = createTheme({
        palette: {
          white: {
            main: '#FFFFFF',
          },
        },
      });
    
    const [questions, setQuestions] = useState(null);
    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch("https://the-trivia-api.com/v2/questions");
            const data = await response.json();
            let ques = [];
            if (data) {
                data.forEach((question) => {
                    let allAns = [
                        {
                            answer: question.incorrectAnswers[0],
                            isCorrect: false,
                            clicked : false
                        },
                        {
                            answer: question.incorrectAnswers[1],
                            isCorrect: false,
                            clicked : false
                        },
                        {
                            answer: question.incorrectAnswers[2],
                            isCorrect: false,
                            clicked : false
                        },
                        {
                            answer: question.correctAnswer,
                            isCorrect: true,
                            clicked : false
                        },
                    ];
                    allAns.sort(() => Math.random() - 0.5);
                    ques.push({
                        text: question.question.text,
                        answers: allAns
                    })
                });
            }
            setQuestions(ques)
        };
        fetchQuestions();
    }, []);

    const handleClick = (q_idx, a_idx) => {
        let questions_copy = [...questions];
        let item_copy = {
            ...questions[q_idx].answers[a_idx],
            clicked: true
        };
        questions_copy[q_idx].answers[a_idx] = item_copy;
        setQuestions(questions_copy);
    }

    console.log(questions)
    return (
        <ThemeProvider theme={theme}>
        <>
            <Typography variant="h3">trivia!!</Typography>
            <div>
                {questions && questions.map((q, q_idx) => (
                    <>
                        <Typography variant="h6">{q.text}</Typography>
                        {q.answers.map((a, a_idx)=>{
                            if (a.clicked) {
                                if (a.isCorrect){
                                    return(
                                        <Button key = {a_idx}variant= "contained" color ="success">
                                            {a.answer}
                                        </Button>
                                    )
                                } else {
                                    return(
                                        <Button key = {a_idx}variant= "contained" color ="error">
                                            {a.answer}
                                        </Button>
                                    )
                                }
                            } else {
                                return(
                                    <Button key = {a_idx} variant= "outlined" onClick = {() => handleClick(q_idx, a_idx)}>
                                        {a.answer}
                                    </Button>
                                )
                            }
                        })}
                    </>
                ))}
            </div>
        </>
        </ThemeProvider>
    );
};


export default TriviaApp;