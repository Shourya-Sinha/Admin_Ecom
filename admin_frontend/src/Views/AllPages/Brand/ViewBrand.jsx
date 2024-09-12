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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteABrand, getAllBrands } from "../../../Redux/Slices/DataSlice";
import { Delete, Edit } from "@mui/icons-material";
import EditBrandDialog from "./EditBrandDialog.jsx";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
const ViewBrand = () => {
  const allBrands = useSelector((state) => state.productData.brand);
  const dispatch = useDispatch();
  const { isLoading, isNewLoading } = useSelector((state) => state.productData);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const deleteBrand = (brandId) => {
    console.log("brand id to delete ", brandId);
    dispatch(deleteABrand(brandId));
  };

  const handleEditClick = (brand) => {
    setSelectedBrand(brand);
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      <Box>
        {allBrands.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={tableCellStyle}>SNo</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Brand Name
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Brand Logo
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Description
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Created At
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBrands.map((brand, index) => (
                  <TableRow key={brand._id}>
                    <StyledTableCell sx={tableCellName}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellName}>
                      {brand.title}
                    </StyledTableCell>
                    <StyledTableCell>
                      <img
                        src={brand.brandlogo.secure_url}
                        alt={brand.title}
                        width="50px"
                        height="50px"
                        style={{ objectFit: "contain" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {brand.description}
                    </StyledTableCell>
                    <StyledTableCell>
                      {new Date(brand.createdAt).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <IconButton onClick={() => handleEditClick(brand)}>
                          {isLoading === brand._id ? (
                            <CircularProgress size={24} /> // Correctly shows progress during update
                          ) : (
                            <Edit color="primary" />
                          )}
                        </IconButton>
                        <IconButton onClick={() => deleteBrand(brand._id)}>
                          {isLoading === brand._id ? (
                            <CircularProgress size={24} />
                          ) : (
                            <Delete color="error" />
                          )}
                        </IconButton>
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
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
              No Brands Available
            </Typography>
            <Typography variant="body1" sx={{ color: "#999" }}>
              Please add some brands to see them here.
            </Typography>
          </Box>
        )}
      </Box>

      <EditBrandDialog
        open={isEditDialogOpen}
        onClose={handleDialogClose}
        brand={selectedBrand}
      />
    </>
  );
};

export default ViewBrand;
