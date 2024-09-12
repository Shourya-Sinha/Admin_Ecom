import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewCoupon } from "../../../Redux/Slices/DataSlice";

const CreateCoupon = () => {
  const { isNewLoading } = useSelector((state) => state.productData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expirationDate = new Date(
        `${formData.expiryDate}T${formData.expiryTime}:00Z`
      ).toISOString();

      const finalFormData = {
        title: formData.title,
        couponName: formData.couponName,
        discountPercentage: formData.discountPercentage,
        expiry: expirationDate, // Only include the combined expiration date
        usageLimit: formData.usageLimit,
      };
      dispatch(createNewCoupon(finalFormData));
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        title: "",
        couponName: "",
        discountPercentage: "",
        expiry: "",
        usageLimit: "",
      });
    }
  };

  return (
    <>
      <Container>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Name of Coupon"
              id="fullWidth"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Coupon Code"
              id="fullWidth"
              name="couponName"
              value={formData.couponName}
              onChange={handleChange}
            />
          </FormControl>

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
          <Stack sx={{ alignItems: "end" }}>
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
              <Button variant="contained" onClick={handleSubmit}>
                Create Coupon
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default CreateCoupon;
