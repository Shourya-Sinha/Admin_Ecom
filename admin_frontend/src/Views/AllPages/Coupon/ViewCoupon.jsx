import React, { useEffect, useState } from "react";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import { deleteCoupon, getAllCoupon } from '../../../Redux/Slices/DataSlice';
import EditCoupon from "./EditCoupon";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableCellStyle = {
  opacity: 0.7,
  //background: 'transparent',
  fontSize: "0.65rem",
  fontWeight: 700,
  textTransform: "uppercase",
};
const tableCellName = {
  fontSize: "0.875rem",
  fontWeight: 600,
  opacity: 1,
};
const tableCellDesc = {
  fontSize: "0.75rem",
  fontWeight: 300,
  opacity: 1,
};


const ViewCoupon = () => {
    const allCoupons = useSelector((state)=> state.productData.coupon);
    const { isLoading } = useSelector((state) => state.productData);
    const dispatch = useDispatch();

    useEffect(()=>{
       dispatch(getAllCoupon());
    },[dispatch])

  const [selctedCoupon, setSelectedCoupon] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleDeleteCoupon = (couponId) => {
    console.log("colcouponor id in page", couponId);
    dispatch(deleteCoupon(couponId));
  };

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setEditDialogOpen(true);
  };
  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedCoupon(null);
  };


return (
    <>
      <Box>
        {allCoupons.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={tableCellStyle}>SNo.</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Coupon Name</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Coupon Code</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Discount (%)</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Expiry Date
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Coupon Status
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Coupon Used
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Coupon Limit
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCoupons.map((coupon, index) => (
                  <StyledTableRow key={coupon._id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={tableCellName}
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={tableCellName}
                    >
                      {coupon.title}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={tableCellName}
                    >
                      {coupon.code}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {coupon.discountPercentage}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {`${new Date (coupon.expirationDate).toLocaleDateString()} ${new Date (coupon.expirationDate).toLocaleTimeString()}` }
                      {/* {(coupon.expirationDate).toLocaleDateString()} */}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {coupon.isActive ? 'True' : 'False'}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {coupon.usageCount}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {coupon.usageLimit}
                    </StyledTableCell>
                    
                    <StyledTableCell>
                      {" "}
                      <Stack direction={"row"} alignItems={"center"}>
                        {/* <IconButton> <Edit color="primary" /></IconButton> */}
                        {/* <IconButton> <Delete color="error" /></IconButton> */}
                        <IconButton onClick={() => handleEditCoupon(coupon)}>
                          {isLoading === coupon._id ? (
                            <CircularProgress size={24} />
                          ) : (
                            <Edit color="primary" />
                          )}
                        </IconButton>{" "}
                        <IconButton
                          onClick={() => handleDeleteCoupon(coupon._id)}
                        >
                          {isLoading === coupon._id ? (
                            <CircularProgress size={24} />
                          ) : (
                            <Delete color="error" />
                          )}
                        </IconButton> 
                      </Stack>{" "}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" sx={{ color: "#777" }}>
              No Coupons Available
            </Typography>
            <Typography variant="body1" sx={{ color: "#999" }}>
              Please add some Colors to see them here.
            </Typography>
          </Box>
        )}
      </Box>

      <EditCoupon
        open={isEditDialogOpen}
        onClose={handleDialogClose}
        coupon={selctedCoupon}
      />
    </>
  )
}

export default ViewCoupon;