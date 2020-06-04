import React, { useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Question from '../../components/Questions/Question/Question';
import data from '../../json/questionsList.json';
import useStyles from "./styles";

const questionsData = data.questions;

const QuestionListings = () => {
    var classes = useStyles();
    const questions = useState(questionsData)[0];
    const [index, setIndex] = useState(0);
    const [surveyValue, setSurveyValue] = useState([]);
    const [isSubmit, setSubmit] = useState(false);
    let current = questions[index];

    const surveyDataHandler = (ques, ans, next) => {
        const nextIndex = next !== "" ? questions.findIndex(q => q.id === next) : setSubmit(true);
        nextIndex !== undefined ? setIndex(nextIndex) : setIndex();
        current = questions[index];
        setSurveyValue([...surveyValue, { 'question': ques, 'answer': ans }]);

    }

    return (
        <>
            <Grid container className={classes.container}>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Typography variant="h2" color="secondary" className={classes.greeting}>
                        User Servey
                     </Typography>
                    {!isSubmit ? <Question
                        question={current}
                        number={index}
                        saveQuesInputs={surveyDataHandler}></Question> :
                        <Grid>
                            <Typography variant="h4" color="primary" className={classes.subGreeting}>Thanks for the servey. Check your response below</Typography>

                            {surveyValue.map((value, index) =>
                                <Grid key={index}>
                                    <div ></div>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" color="secondary">Question:</Typography><Typography variant="subtitle1" color="textSecondary"> {value.question}</Typography>
                                            <Typography variant="h6" color="primary">Answer:</Typography><Typography variant="subtitle1" color="textPrimary">  {value.answer}</Typography>
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