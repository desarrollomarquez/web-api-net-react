import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm"
import { connect } from 'react-redux';
import * as actions from "../actions/user"
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    mdMargin: {
        margin: theme.spacing(2)
    }
})


const initialFieldValues = {
    fullName: '',
    fullLastName: '',
    nameUser: '',
    email: '',
    password: ''
}


const UserForm = ({ classes, ...props }) => {
    //toast msg.
    const { addToast } = useToasts()


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullNamename ? "" : "This field is required."
        if ('fullLastName' in fieldValues)
            temp.fullLastName = fieldValues.fullLastName ? "" : "This field is required."
        if ('nameUser' in fieldValues)
            temp.nameUser = fieldValues.nameUser ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "This field is required."
        // if ('addedToCart' in fieldValues)
        //     temp.addedToCart = fieldValues.addedToCart ? "" : "This field is required."
        setErrors({
            ...temp
        })

        // if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)



    //material-ui select component - label width fix
    // const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);



    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createUser(values, onSuccess)
            else
                props.updateUser(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.userList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId, props.userList, setErrors, setValues])


    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        // error={true}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        name="fullLastName"
                        variant="outlined"
                        label="Full Last Name"
                        value={values.fullLastName}
                        onChange={handleInputChange}
                        // error={true}
                        {...(errors.fullLastName && { error: true, helperText: errors.fullLastName })}
                    />
                    <TextField
                        name="nameUser"
                        variant="outlined"
                        label="User Name"
                        value={values.nameUser}
                        onChange={handleInputChange}
                        // error={true}
                        {...(errors.nameUser && { error: true, helperText: errors.nameUser })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        // error={true}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <TextField
                        name="password"
                        variant="outlined"
                        label="Password"
                        value={values.password}
                        onChange={handleInputChange}
                        // error={true}
                        {...(errors.password && { error: true, helperText: errors.password })}
                    />
                    {/* <FormControl variant="outlined"
                        className={classes.formControl}>
                        <InputLabel ref={inputLabel}>Add</InputLabel>
                        <Select
                            name="add"
                            value={values.addedToCart}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </Select>
                    </FormControl> */}
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.mdMargin}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.mdMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => {
    return {
        userList: state.user.list
    }
}

// props.productList
const mapActionToProps = {
    createUser: actions.create,
    updateUser: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserForm));