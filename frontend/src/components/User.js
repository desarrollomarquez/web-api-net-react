import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions/user"
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, ButtonGroup, TableCell, TableBody, withStyles, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import UserForm from './UserForm'
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.5rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    }
})

const User = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllUsers()
    }, [])

    //toast message
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure you want to delete this user?'))
            props.deleteUser(id, () => addToast("User deleted", { appearance: 'success' }))
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <UserForm {...({currentId, setCurrentId})} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell align='center'>Name</TableCell>
                                    <TableCell align='center'>Last Name</TableCell>
                                    <TableCell align='center'>Username</TableCell>
                                    <TableCell align='center'>Email</TableCell>
                                
                                    {/* <TableCell>shoppingListProducts ID</TableCell> */}
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.userList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell align='center'>{record.fullName}</TableCell>
                                            <TableCell align='center'>{record.fullLastName}</TableCell>
                                            <TableCell align='center'>{record.nameUser}</TableCell>
                                            <TableCell align='center'>{record.email}</TableCell>
                        
                                            {/* <TableCell>{String(record.shoppingListProducts)}</TableCell> */}
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button variant="text"><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );

}

const mapStateToProps = state => {
    return {
        userList: state.user.list
    }
}

// props.productList
const mapActionToProps = {
    fetchAllUsers: actions.fetchAll,
    deleteUser: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(User));