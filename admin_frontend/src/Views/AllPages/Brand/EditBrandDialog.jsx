import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateBrand } from '../../../Redux/Slices/DataSlice';

const EditBrandDialog = ({ open, onClose, brand }) => {
    const dispatch = useDispatch();
  const [title, setTitle] = useState(brand?.title || '');
  const [brandlogo, setBrandlogo] = useState(null);

  const handleUpdate = () => {
    const updatedData = {
      brandId: brand._id,
      title,
      brandlogo,
    };
    dispatch(updateBrand(updatedData));
    onClose();
  };

  const handleLogoChange = (e) => {
    setBrandlogo(e.target.files[0]);
  };

  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Brand</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField 
            label="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            fullWidth 
          />
          <input 
            type="file" 
            onChange={handleLogoChange} 
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default EditBrandDialog;