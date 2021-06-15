import React, { useState } from 'react'
import db from './firebase'

import { 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Button, 
    ListItemSecondaryAction,
    IconButton,  
    Avatar,
    Dialog,
    TextField, 
    DialogActions, 
    DialogContent,
    DialogTitle
    } from '@material-ui/core'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import EditIcon from '@material-ui/icons/Edit';

function Todo(props) {

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (update) => {
    
        if(update) {
            db.collection('todos').doc(props.id).set({ 
                todo: input
            }, { merge: true });
        }
      setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit the task</DialogTitle>
                <DialogContent>
                    <TextField placeholder={props.text} value={input} onChange={event => setInput(event.target.value)} autoFocus margin="dense" id="name" label="todo" type="text" fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PlaylistAddCheckIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.text} secondary={props.deadline}/>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="edit" onClick={handleClickOpen}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={ event => db.collection('todos').doc(props.id).delete() }>
                            <DeleteForeverIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
            </ListItem>
        </>
    )
}

export default Todo
