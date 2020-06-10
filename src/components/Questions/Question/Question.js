import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '../../Form/Input/Input';
import Select from '../../Form/Select/Select';
import Radio from '../../Form/Radio/Radio';
import Loader from '../../Loader/Loader';
import useStyles from "./styles";

const Question = (props) => {
    const [quesValue, setQuesValue] = useState('');
    const [isDisabled, setDisabled] = useState(true);
    const [inputValue, setInput] = useState();
    const [isError, setError] = useState('');
    var classes = useStyles();
    var rows = [];

    useEffect(() => {

        if (props.question.dependant) {
            let prev = props.savedQuestions.find(q => q.id === props.question.dependant);
            let input = parseInt(prev.answer);
            setInput(input);
        } else {
            setInput(1);
        }
                                            
        if (props.savedQuestions.length !== 0) {
            const quesIndex = props.savedQuestions.findIndex(q => q.id === props.question.id);
            if (quesIndex > -1) {
                let answer = props.savedQuestions[quesIndex].answer;
                setQuesValue(answer);
                 setDisabled(false);
            }
        }
    }, [props]);
                  
    /** Function for handling the validations */
    const handleValidation = (event) => {
        if (props.question.validations !== undefined) {
            var ifError = props.question.validations.map((q, k) => {
                if (q.type === "isNumeric") {
                    return event.match("(^[^A-Za-z&+:;=?@#|'<>.^*()%!-]*)$") != null ? true : false;
                }
            })
            var error = ifError.toString();
            return error === 'true' ? '' : 'It should be numeric';
        } else {
            return '';
        }
    }

    /** Function for handling the input value changes */
    const handleChange = (event, key) => {
        const responseError = handleValidation(event.target.value);
        if (responseError !== '') {
            setError(responseError);
        } else {
            if (key !== undefined) {
                setQuesValue({ ...quesValue, [key]: event.target.value });
            } else {
                setQuesValue(event.target.value);
            }
            event.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
            setError('');
        }
    }
            
    /** Function for the previous functionality */
    const prevInputs = () => {
        setDisabled(false);
        props.prevQuesInputs();
    }

    /** Function for the next functionality and saving the response */
    const saveInputs = () => {
        let nextValue = '';
        if (props.question.conditions) {
            const next = props.question.conditions.findIndex(i => i.value === quesValue);
            nextValue = props.question.conditions[next].nextStep;
        } else {
            nextValue = props.question.nextStep;
        }
        props.saveQuesInputs(props.question.title, quesValue, nextValue, props.question.id);
        setQuesValue('');
        setDisabled(true);
    }

    /** Render the inputs */
    const renderSwitch = () => {
        switch (props.question.type) {
            case 'input': return (
                <div>
                    {
                        inputValue ?
                            <Input
                                id={props.question.id}
                                number={inputValue}
                                value={quesValue}
                                type={props.question.accept}
                                name={props.question.name}
                                label={props.question.title}
                                placeholder={props.question.placeholder}
                                onChange={handleChange}
                                validations={props.question.validations} /> :
                                <Loader />
                    }

                </div>
            );
            case 'radio': return (
                <div>
                    <Radio
                        id={props.question.id}
                        name={props.question.name}
                        label={props.question.title}
                        options={props.question.options}
                        value={quesValue}
                        onChange={handleChange}
                    />
                </div>
            );
            case 'select': return (
                <div>
                    <Select
                        id={props.question.id}
                        label={props.question.title}
                        options={props.question.options}
                        value={quesValue}
                        onChange={handleChange}
                    />
                </div>
            );
        }
    }

    return (
        <>
            <Grid container direction="column" justify="space-between" alignItems="center">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        {renderSwitch()}
                        { isError !== '' ? 
                        <Alert severity="error">{isError}</Alert> :
                        null}
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" >
                            {
                                props.number !== 0 ?
                                    <Button
                                        color="primary"
                                        size="large"
                                        onClick={prevInputs}>
                                        Prev
                                    </Button>
                                    :
                                    null
                            }
                            {
                                props.number !== (props.total - 1) ?
                                    <Button
                                        color="secondary"
                                        size="large"
                                        onClick={saveInputs}
                                        disabled={isDisabled}>
                                        Next
                                    </Button>
                                    :
                                    null
                            }
                            {
                                props.number == (props.total - 1) ?
                                    <Button
                                        color="secondary"
                                        size="large"
                                        onClick={saveInputs}
                                        disabled={isDisabled}>
                                        Submit
                                    </Button>
                                    :
                                    null
                            }
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}

export default Question;