import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editColor } from "../../../Redux/Slices/DataSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import ColorSelector from "react-color-selector";

const EditColorDialog = ({ open, onClose, color }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  let [myColor, pickedColor] = useState("");

  const handleUpdate = () => {
    const data = {
      colorId: color._id,
      title,
      hexCode: myColor,
    };
    console.log('data in page',data);
    dispatch(editColor(data));
    onClose();
  };

  let picker_data = {
    col: 12,
    row: 12,
    width: 200,
    height: 200,
    view: "both",
    theme: "dark",
    title: "COLORS",
    cellControl: 3,
  };
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Color</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Color Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
            <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
            <p>Selected Color :- {myColor}</p>
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
  );
};

export default EditColorDialog;
