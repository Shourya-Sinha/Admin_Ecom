import { Button, CircularProgress, Container, FormControl, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ColorSelector from 'react-color-selector';
import { useDispatch, useSelector } from 'react-redux';
import { createColor, resetIsNewLoading } from '../../../Redux/Slices/DataSlice';

const CreateColor = () => {
  let [myColor, pickedColor] = useState('');
  const [title,setTitle] = useState('');
  const dispatch = useDispatch();
  const { isNewLoading } = useSelector((state) => state.productData);

  const handletitleChange=(e)=>{
  setTitle(e.target.value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData = {
      title: title,
      hexCode: myColor
    }
    console.log('formdata',formData);
     dispatch(createColor(formData));
  }
    let picker_data = {
        col: 12,
        row: 12,
        width: 300,
        height: 250,
        view: 'both', 
        theme: 'dark',
        title:'COLORS',
        cellControl:4
    }
    const handleResetLoading = () => {
      dispatch(resetIsNewLoading());
    };
  return (
    <>
     <Container>
    <Stack spacing={3}>
      <FormControl fullWidth>
        <TextField fullWidth label="Name of Color" id="fullWidth" name='title' value={title} onChange={handletitleChange} />
      </FormControl>
      <p style={{marginBottom:0}}>Select Hex Color :</p>
      <ColorSelector pallet={picker_data} selectedColor={pickedColor}  />
      <p>Selected Color :- {myColor}</p>
      <Stack sx={{alignItems:'end'}}>
       
        {isNewLoading ? (
              <CircularProgress
                size={24}
                sx={{
                  position: "relative",
                  top: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            ) : (
              <Button className='border' onClick={handleSubmit} variant="outlined" color="secondary">Create Color </Button>
            )}
      </Stack>
    </Stack>
  </Container>
  {/* <Button onClick={handleResetLoading} variant="outlined" color="secondary">
          Reset Loading State
        </Button> */}
    </>
  )
}

export default CreateColor