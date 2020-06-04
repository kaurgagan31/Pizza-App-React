import React, { useState } from 'react';
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '../../Form/Input/Input';
import Select from '../../Form/Select/Select';
import useStyles from "./styles";

const Question = (props) => {
    const [quesValue, setQuesValue] = useState('');
    const [isDisabled, setDisabled] = useState(true);
    var classes = useStyles();

    const handleChange = (event) => {
        setQuesValue(event.target.value);
        event.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
    }

    const saveInputs = () => {
        let nextValue = '';
        if (props.question.conditions) {
            const next = props.question.conditions.findIndex(i => i.value === quesValue);
            nextValue = props.question.conditions[next].nextStep;
        } else {
            nextValue = props.question.nextStep;
        }
        props.saveQuesInputs(props.question.title, quesValue, nextValue);
        setQuesValue('');
        setDisabled(true);
    }
    const renderSwitch = () => {
        switch (props.question.type) {
            case 'input': return (
                <div>
                    <Input
                        id={props.question.id}
                        value={quesValue}
                        label={props.question.title}
                        placeholder={props.question.placeholder}
                        onChange={handleChange} />
                </div>
            );
            case 'select': return (
                <div>
                    <Select
                        name={props.question.name}
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
             </CardContent>
             <CardActions>
            <Grid item xs={6}>
                {/* {props.number !== 0 ? <Button color="primary" size="large" >
                    Prev</Button> : null} */}
                {
                    props.number !== 7 ? <Button color="secondary" size="large" onClick={saveInputs} disabled={isDisabled}>
                        Next</Button> : null
                }
                {
                    props.number == 7 ? <Button color="secondary" size="large" onClick={saveInputs} disabled={isDisabled}>
                        Submit</Button> : null
                }
            </Grid>
            </CardActions>
             </Card>
            
            </Grid>
        </>
    )
}

export default Question;