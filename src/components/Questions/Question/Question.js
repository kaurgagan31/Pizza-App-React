import React, { useState } from 'react';
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '../../Form/Input/Input';
import Select from '../../Form/Select/Select';
import Radio from '../../Form/Radio/Radio';
import CheckboxList from '../../Form/Checkbox/CheckboxList';
import useStyles from "./styles";

const Question = (props) => {
    console.log(props);
    const [quesValue, setQuesValue] = useState('');
    const [isDisabled, setDisabled] = useState(true);
    const [isAllSelected, setAllSelected] = useState(false);
    var classes = useStyles();

    const handleChange = (event) => {
        setQuesValue(event.target.value);
        event.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
    }
    const handleCheckBoxChange = (checkName, isChecked) => {
        let isAllChecked = (checkName === 'all' && isChecked);
        let isAllUnChecked = (checkName === 'all' && !isChecked);
        const checked = isChecked;
        const checkList = props.question.options.map((option, index) => {
            if (isAllChecked || option.value === checkName) {
                return Object.assign({}, option, {
                    checked,
                });
            } else if (isAllUnChecked) {
                return Object.assign({}, option, {
                    checked: false,
                });
            }
            return option;
        });
        let isAllSelectedValue = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;
        let checkedValues = checkList.filter(e => { return e.checked === true });
        let checkedArray = []
        checkedValues.map((v, i) => {
            checkedArray.push(v.value);
        });
        props.question.options = checkList;
        setQuesValue(checkedArray);
        setAllSelected(isAllSelectedValue);
        checkedArray.length !== 0 ? setDisabled(false) : setDisabled(true);
    }

    const prevInputs = () => {
        setQuesValue(props.prev.answer);
        setDisabled(false);
        props.prevQuesInputs(props.number);
    }

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
            case 'check': return (
                <div>
                    <CheckboxList
                        id={props.question.id}
                        label={props.question.title}
                        options={props.question.options}
                        isCheckedAll={isAllSelected}
                        onCheck={handleCheckBoxChange}
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
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" >
                            {
                                props.prev !== null ?
                                    <Button color="primary" size="large" onClick={prevInputs}>
                                        Prev
                                    </Button>
                                    :
                                    null
                            }
                            {
                                props.number !== (props.total - 1) ?
                                    <Button color="secondary" size="large" onClick={saveInputs} disabled={isDisabled}>
                                        Next
                                    </Button>
                                    :
                                    null
                            }
                            {
                                props.number == (props.total - 1) ? <Button color="secondary" size="large" onClick={saveInputs} disabled={isDisabled}>
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