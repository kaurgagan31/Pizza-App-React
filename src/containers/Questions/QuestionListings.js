import React, { useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Question from '../../components/Questions/Question/Question';
import data from '../../json/questionsList.json';
import useStyles from "./styles";

const questionsData = data.questions;

const QuestionListings = () => {
    var classes = useStyles();
    const questions = useState(questionsData)[0];
    const [index, setIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [surveyValue, setSurveyValue] = useState([]);
    const [prevQues, setPrevQues] = useState(null);
    const [isSubmit, setSubmit] = useState(false);
    const [currQues, setCurrent] = useState({...questions[index]});
    const [userQuesList, setUserQuesList ] = useState([]);

    const prevDataHandler = (currIndex) => {
        console.log(userQuesList);
        let data = userQuesList[userQuesList.length - 1];
        const updatedIndex = questions.findIndex(q => q.id === data);
        console.log(updatedIndex);
        let updatedUserList= userQuesList.filter((member,index) => { return index !== userQuesList.length - 1});
        setUserQuesList( updatedUserList);
        setCurrent({...questions[updatedIndex]});
    }

    const surveyDataHandler = (ques, ans, next, curr) => {
        const nextIndex = next !== "" ? questions.findIndex(q => q.id === next) : setSubmit(true);
        const prevIndx = questions.findIndex(q => q.id === curr);
        nextIndex !== undefined ? setIndex(nextIndex) : setIndex();
        //current = questions[index];
        setSurveyValue([...surveyValue, { 'question': ques, 'answer': ans, id: curr }]);
        setUserQuesList([...userQuesList, curr]);
        let prevQuest = { 'question': ques, 'answer': ans };       
        setPrevIndex(prevIndx);
        setPrevQues(prevQuest);
        setCurrent({...questions[nextIndex]});
        console.log(userQuesList);
    }

    return (
        <>
            <Grid container className={classes.container}>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Typography variant="h2" color="secondary" className={classes.greeting}>
                        User Servey
                     </Typography>
                    {!isSubmit ? <Question
                        question={currQues}
                        prev = {prevQues}
                        number={index}
                        total={questions.length}
                        saveQuesInputs={surveyDataHandler}
                        prevQuesInputs={prevDataHandler}  >
                        </Question> :
                        <Grid>
                            <Typography variant="h4" color="primary" className={classes.subGreeting}>Thanks for the servey. Check your response below</Typography>

                            {surveyValue.map((value, index) =>
                                <Grid key={index}>
                                    <div ></div>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" color="secondary">Question:</Typography><Typography variant="subtitle1" color="textSecondary"> {value.question}</Typography>
                                            <Typography variant="h6" color="primary">Answer:</Typography>
                                            {
                                                typeof value.answer === "string" ?
                                                    <Typography variant="subtitle1" color="textPrimary"> {value.answer}
                                                    </Typography> :

                                                    value.answer.map((i, k) => {
                                                        return (
                                                            <Typography key={k} variant="subtitle1" color="textPrimary"> {i}
                                                            </Typography>
                                                        )
                                                    })
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    }
                </Grid>
            </Grid>
        </>
    );
}

export default QuestionListings;