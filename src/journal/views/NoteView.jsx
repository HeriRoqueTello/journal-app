import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startSaveNotes, startUploadingFiles } from "../../store/journal/thunks"
import { startDeletingNote } from "../../store/auth/thunks";

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active:note, messageSaved, isSaving } = useSelector(state => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    
    const newDate = new Date(date);
    
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if( messageSaved.length > 0 ) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNotes());
  }

  const onInputFileChange = ({target}) => {
    if(target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  }

  const onDeleteNote = () => {
    Swal.fire({
      title: "Estas seguro de eliminar esta nota?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6F67CA",
      confirmButtonText: "Si, eliminalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingNote());
        Swal.fire({
          title: "Eliminado!",
          text: "Tu nota ha sido eliminada.",
          icon: "success"
        });
      }
    });
    
  }

  return (
    <Grid className="animate__animated animate__fadeIn animate__faster" container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
      </Grid>

      <Grid item>

        <input 
          type="file"
          multiple
          onChange={onInputFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>

        <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField 
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label='Titulo'
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField 
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedio en hoy?"
          minRows={ 5 }
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent={'end'}>
        <Button
          onClick={onDeleteNote}
          sx={{
            mt: 2
          }}
          color="error"
        >
          <DeleteOutline />
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery images={note.imageUrls} />

    </Grid>
  )
}
