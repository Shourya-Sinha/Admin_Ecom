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
import { deleteColor, getAllColors } from "../../../Redux/Slices/DataSlice";
import { Delete, Edit } from "@mui/icons-material";
import EditColorDialog from "./EditColorDialog";

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

const ViewColor = () => {
  const allColors = useSelector((state) => state.productData.colors);
  const { isLoading } = useSelector((state) => state.productData);
  const [selctedColor, setSelectedColor] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllColors());
  }, [dispatch]);

  //console.log("all colors", allColors);
  const handleDeleteColor = (colorId) => {
    console.log("color id in page", colorId);
    dispatch(deleteColor(colorId));
  };

  const handleEditColor = (color) => {
    setSelectedColor(color);
    setEditDialogOpen(true);
  };
  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedColor(null);
  };
  return (
    <>
      <Box>
        {allColors.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={tableCellStyle}>SNo.</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Title</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>HexCode</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Display Color
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    CreatedAt
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allColors.map((color, index) => (
                  <StyledTableRow key={color._id}>
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
                      {color.title}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {color.hexCode}
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: color.hexCode,
                          borderRadius: "50%",
                          border: "1px solid #000",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell sx={tableCellDesc}>
                      {new Date(color.createdAt).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <Stack direction={"row"} alignItems={"center"}>
                        {" "}
                        <IconButton onClick={() => handleEditColor(color)}>
                          {isLoading === color._id ? (
                            <CircularProgress size={24} />
                          ) : (
                            <Edit color="primary" />
                          )}
                        </IconButton>{" "}
                        <IconButton
                          onClick={() => handleDeleteColor(color._id)}
                        >
                          {isLoading === color._id ? (
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
              No Colors Available
            </Typography>
            <Typography variant="body1" sx={{ color: "#999" }}>
              Please add some Colors to see them here.
            </Typography>
          </Box>
        )}
      </Box>

      <EditColorDialog
        open={isEditDialogOpen}
        onClose={handleDialogClose}
        color={selctedColor}
      />
    </>
  );
};

export default ViewColor;
