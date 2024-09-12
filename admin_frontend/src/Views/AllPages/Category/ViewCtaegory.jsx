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
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteACategory,
  getAllCategory,
} from "../../../Redux/Slices/DataSlice";
import { Delete, Edit } from "@mui/icons-material";
import EditCategoryDialog from "./EditCategoryDialog";

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

const ViewCtaegory = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.productData.category);
  const { isLoading } = useSelector((state) => state.productData);

  const [selectedCategory, setSelectedCtaegory] = useState(null);
  const [isEditDiaolgOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  const flattenedCategories = allCategories.flat();

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteACategory(categoryId));
  };

  const habdleEditClick = (category) => {
    setSelectedCtaegory(category);
    setEditDialogOpen(true);
  };

  const habdleDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedCtaegory(null);
  };

  return (
    <>
      <Box>
        {flattenedCategories.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={tableCellStyle}>SNo</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Category Name
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Category Pic
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Sub-Category Name
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    CreatedAt
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flattenedCategories.map((category, index) => (
                  <TableRow key={category._id}>
                    <StyledTableCell sx={tableCellName}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellName}>
                      {category.categoryName}
                    </StyledTableCell>
                    <StyledTableCell>
                      <img
                        src={category.catPic.secure_url}
                        alt={category.categoryName}
                        width="50px"
                        height="50px"
                        style={{ objectFit: "contain" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {category.subCategory}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <IconButton onClick={() => habdleEditClick(category)}>
                        {isLoading === category._id ? (
                            <CircularProgress size={24} /> // Correctly shows progress during update
                          ) : (
                            <Edit color="primary" />
                          )}
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          {isLoading === category._id ? (
                            <CircularProgress size={24} />
                          ) : (
                            <Delete color="error" />
                          )}
                        </IconButton>
                      </Stack>{" "}
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
              No Categories Available
            </Typography>
            <Typography variant="body1" sx={{ color: "#999" }}>
              Please add some Categories to see them here.
            </Typography>
          </Box>
        )}
      </Box>
      <EditCategoryDialog
        open={isEditDiaolgOpen}
        onClose={habdleDialogClose}
        category={selectedCategory}
      />
    </>
  );
};

export default ViewCtaegory;
