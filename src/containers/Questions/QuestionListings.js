import React, {useState} from 'react';
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import Question from '../../components/Questions/Question/Question';
import data from '../../json/questionsList.json';
import useStyles from "./styles";

const questionsData = data.questions;

const QuestionListings = () => {
    var classes = useStyles();
    const questions = useState(questionsData)[0];
    console.log(questions);
    const [index, setIndex] = useState(0);
    const current = questions[index];
    console.log(current);


    return (
        <>

            <Grid container className={classes.container}>

                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Typography variant="h5" color="secondary" className={classes.greeting}>
                        User Servey ..!!
             </Typography>
                    <Question
                    question={current}></Question>
                </Grid>

            </Grid>
                
    
        </>
    );
}

export default QuestionListings;