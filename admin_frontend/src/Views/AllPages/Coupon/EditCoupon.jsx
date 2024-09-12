import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { upadtedCoupon } from "../../../Redux/Slices/DataSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";

const EditCoupon = ({ open, onClose, coupon }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    couponName: "",
    discountPercentage: "",
    expiryDate: "", // Separate state for date
    expiryTime: "",
    usageLimit: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const expirationDate = new Date(
      `${formData.expiryDate}T${formData.expiryTime}:00Z`
    ).toISOString();

    const finalFormData = {
      couponId: coupon._id,
      title: formData.title,
      couponName: formData.couponName,
      discountPercentage: formData.discountPercentage,
      expiry: expirationDate, // Only include the combined expiration date
      usageLimit: formData.usageLimit,
    };

    dispatch(upadtedCoupon(finalFormData));
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update Coupon CareFully</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              fullWidth
              label="Name of Coupon"
              id="fullWidth"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Coupon Code"
              id="fullWidth"
              name="couponName"
              value={formData.couponName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Discount (%)"
              id="fullWidth"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Choose Expiry Date"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Choose Expiry Time"
              type="time"
              name="expiryTime"
              value={formData.expiryTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="Coupon User Limit "
              id="fullWidth"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
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
  );
};

export default EditCoupon;
