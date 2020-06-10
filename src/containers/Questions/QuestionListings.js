import React, { useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Question from '../../components/Questions/Question/Question';
import data from '../../json/divorcyList.json';
import useStyles from "./styles";

const questionsData = data.questions;

const QuestionListings = () => {
    var classes = useStyles();
    const questions = useState(questionsData)[0];
    const [index, setIndex] = useState(0);
    const [surveyValue, setSurveyValue] = useState([]);
    const [isSubmit, setSubmit] = useState(false);
    const [currQues, setCurrent] = useState({ ...questions[index] });
    const [userQuesList, setUserQuesList] = useState([]);

    /** Handling function for previous functionality */
    const prevDataHandler = () => {
        let data = userQuesList[userQuesList.length - 1];
        const updatedIndex = questions.findIndex(q => q.id === data);
        let updatedUserList = userQuesList.filter((member, index) => { return index !== userQuesList.length - 1 });
        setUserQuesList(updatedUserList);
        setIndex(updatedIndex);
        setCurrent({ ...questions[updatedIndex] });
    }

    /** Handling function for next functionality and saving the responses */
    const surveyDataHandler = (ques, ans, next, curr) => {
        const nextIndex = next !== "" ? questions.findIndex(q => q.id === next) : setSubmit(true);
        nextIndex !== undefined ? setIndex(nextIndex) : setIndex();
        const quesIndex = surveyValue.findIndex(q => q.id === curr);
        let surveyQues = [...surveyValue];
        if (quesIndex > -1) {
            let quest = questions.find(q => q.id === curr);
            if (ans === "No") {
                let condition = quest.conditions.find(c => c.value === "Yes");
                condition.children.map((c, i) => {
                    let qIndx = surveyQues.find(i => i.id === c);
                    if (qIndx !== undefined) {
                        let ind = surveyQues.findIndex(i => i.id === qIndx.id);
                        if (ind > -1) {
                            surveyQues.splice(ind, 1);
                        }
                    }
                })
            }
            surveyQues[quesIndex].answer = ans;
            setSurveyValue(surveyQues);
        }
        else {
            setSurveyValue([...surveyValue, { 'id': curr, 'question': ques, 'answer': ans }]);
        }
        setUserQuesList([...userQuesList, curr]);
        setCurrent({ ...questions[nextIndex] });
    }

    /** Outputting the object values */
    const objectValues = (values) => {
        let out = [];
        var result = Object.keys(values).map(function (key) {
            return { 'value': values[key] }
        });
        result.map((key, i) => {
            out.push(
                <Typography key={i} variant="subtitle1" color="textPrimary">Kid {i + 1} - {key.value} years
                </Typography>
            )
        })
        return out;
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
                        number={index}
                        total={questions.length}
                        savedQuestions={surveyValue}
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
                                                    <div>
                                                        {objectValues(value.answer)}
                                                    </div>
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