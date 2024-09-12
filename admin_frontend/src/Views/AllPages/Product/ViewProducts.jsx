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
  Typography,
  IconButton,
  Collapse,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../Redux/Slices/DataSlice";
import PropTypes from "prop-types";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableChildCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4d4d4d", // Light black color
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
const ViewProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productData.products);
  const validProducts = allProducts.filter(
    (product) => product !== null && product !== undefined
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  console.log("all products in page ", allProducts);
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={tableCellStyle} />
              <StyledTableCell sx={tableCellStyle}>
                Product Name
              </StyledTableCell>
              <StyledTableCell sx={tableCellStyle}>Brand</StyledTableCell>
              <StyledTableCell sx={tableCellStyle}>Category</StyledTableCell>
              <StyledTableCell sx={tableCellStyle}>Description</StyledTableCell>
              <StyledTableCell sx={tableCellStyle}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validProducts?.map((product) => (
              <CollapsibleRow key={product._id} row={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

function CollapsibleRow({ row }) {
  const [open, setOpen] = useState(false);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };
  const navigate = useNavigate();
  const truncateDescription = (description, wordLimit = 20) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const truncatetitle = (name, wordLimit = 10) => {
    const words = name.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return name;
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell sx={tableCellName}>{truncatetitle(row.name)}</TableCell>
        <TableCell sx={tableCellStyle}>{row.brand?.title}</TableCell>{" "}
        {/* Assuming row.brand is an object */}
        <TableCell sx={tableCellStyle}>
          {row.category?.categoryName}
        </TableCell>{" "}
        {/* Assuming row.category is an object */}
        <TableCell sx={tableCellStyle}>
          {truncateDescription(row.description)}
        </TableCell>
        <TableCell>
          {" "}
          <Stack direction={"row"} alignItems={"center"}>
            {" "}
            <IconButton onClick={()=>handleEdit(row._id)}>
              <Edit color="primary" />{" "}
            </IconButton>{" "}
            <IconButton>
              <Delete color="error" />{" "}
            </IconButton>
          </Stack>{" "}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="colors and variants">
              <TableHead>
                <TableRow>
                  <StyledTableChildCell sx={tableCellStyle}>
                    Color Name
                  </StyledTableChildCell>
                  <StyledTableChildCell sx={tableCellStyle}>
                    Product Image
                  </StyledTableChildCell>
                  <StyledTableChildCell sx={tableCellStyle}>
                    Hex Code
                  </StyledTableChildCell>
                  <StyledTableChildCell sx={tableCellStyle}>
                    Variants
                  </StyledTableChildCell>
                  <StyledTableChildCell sx={tableCellStyle}>
                    Variants Quantity
                  </StyledTableChildCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.colors?.map((color) => (
                  <TableRow key={color.color._id}>
                    <TableCell sx={tableCellName}>
                      {color.color.title}
                    </TableCell>
                    <TableCell>
                      <img
                        src={color?.images[0]?.secure_url}
                        style={{ width: 60, height: 60, objectFit: "contain" }}
                      />{" "}
                    </TableCell>
                    <TableCell sx={tableCellStyle}>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: color.color.hexCode,
                          borderRadius: "50%",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={tableCellStyle}>
                      {color.variants.map((variant) => (
                        <div key={variant._id}>
                          {variant.name}: ₹{variant.price}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell sx={tableCellStyle}>
                      {color.variants.map((variant) => (
                        <div key={variant._id}>{variant.quantity}</div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ViewProducts;
