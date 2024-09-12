import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatrActaegory } from "../../../Redux/Slices/DataSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Button } from "antd";

const EditCategoryDialog = ({ open, onClose, category }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [catPic, setCatPic] = useState([]);

  const handleUpdate = () => {
    console.log('category id',category._id);
    const formData = {
      categoryId: category._id,
      categoryName,
      subCategory,
      catPic,
    };
    console.log('formdata',formData);
    dispatch(updatrActaegory(formData));
    onClose();
  };

  const handlePicChange = (e) => {
    setCatPic(e.target.files[0]);
  };
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              fullWidth
            ></TextField>
            <TextField
              label="Sub Category Name"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              fullWidth
            ></TextField>
            <input type="file" onChange={handlePicChange} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClose={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCategoryDialog;
