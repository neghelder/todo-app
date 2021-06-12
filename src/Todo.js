import React, { useState } from 'react'
import './Todo.css'
import db from './firebase'

import { List , ListItem, ListItemText, ListItemAvatar, Button } from '@material-ui/core'
import { Dialog, TextField,  DialogActions, DialogContent, DialogTitle }  from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Todo(props) {

    const [open, setOpen] = useState(false);
    //const [input, setInput] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (update) => {
    
        if(update) {
            // db.collection('todos').doc(props.id).set({ 
            //     todo: input
            // }, { merge: true });
        }
      setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit me
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit the todo</DialogTitle>
                <DialogContent>
                    <TextField placeholder={props.text} /*value={input} onChange={event => setInput(event.target.value)}*/ autoFocus margin="dense" id="name" label="todo" type="text" fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
            <List className='todo-list'>
                <ListItem>
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.text} secondary={props.deadline}/>
                    <DeleteForeverIcon onClick={ event => db.collection('todos').doc(props.id).delete() }/>
                </ListItem>
            </List>
        </>
    )
}

export default Todo
