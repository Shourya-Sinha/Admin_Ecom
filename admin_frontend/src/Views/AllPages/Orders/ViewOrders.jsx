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
  IconButton,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../Redux/Slices/DataSlice";
import { authBaseUrl } from "../../../Redux/Slices/AusthSlice";
import axios from "axios";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

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

const itemsColor = [
  "#4096ff",
  "#d46b08",
  "#fa541c",
  "#ff3d00",
  "#e64a19",
  "#d32f2f",
  "#b71c1c",
  "#8d1414",
  "#5d4037",
  "#372727",
  "#1a1414",
  "#000000",
];
const ViewOrders = () => {
  const [error, setError] = useState(null);
  const allOrders = useSelector((state) => state.productData.orders);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // console.log('allorders',allOrders);

  const handleStatusChange = async (
    orderId,
    newPaymentStatus,
    newDeliveryStatus
  ) => {
    try {
      const order = allOrders.find((order) => order._id === orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      // Validation
      if (order.paymentMethod !== "COD" && newPaymentStatus !== "Paid") {
        throw new Error(
          'Payment status can only be updated to "Paid" for non-COD methods.'
        );
      }

      // API Request
      await axios.put(
        `${authBaseUrl}/update-order-status`,
        {
          orderId,
          paymentStatus: newPaymentStatus,
          deliveryStatus: newDeliveryStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally: Update the local state or refetch orders
      dispatch(getAllOrders());
    } catch (err) {
      console.log("error on page", err.message);
      setError(err.message);
    }
  };
  const handleExpandClick = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getDecimalValue = (value) => {
    return value && value.$numberDecimal ? value.$numberDecimal : value;
  };
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = [...allOrders].sort((a, b) => {
    if (sortConfig.key === "totalPrice") {
      return sortConfig.direction === "asc"
        ? a.totalPrice - b.totalPrice
        : b.totalPrice - a.totalPrice;
    }
    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });
  return (
    <>
      <Box>
        {allOrders.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={tableCellStyle} />
                  <StyledTableCell sx={tableCellStyle}>OrderId</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>UserId</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Total Price
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Coupon Discount
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Payment Method
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Payment Status
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Delivery Status
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Return Request
                  </StyledTableCell>
                  <StyledTableCell
                    sx={tableCellStyle}
                    onClick={() => handleSort("createdAt")}
                    style={{ cursor: "pointer" }}
                  >
                    Order Date{" "}
                    {sortConfig.key === "createdAt" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedOrders.map((order) => (
                  <CollapsibleRow
                    key={order._id}
                    row={order}
                    handleStatusChange={handleStatusChange}
                    expandedOrder={expandedOrder}
                    handleExpandClick={handleExpandClick}
                    getDecimalValue={getDecimalValue}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6">No orders found.</Typography>
        )}
      </Box>
    </>
  );
};

const CollapsibleRow = ({
  row,
  handleStatusChange,
  expandedOrder,
  handleExpandClick,
  getDecimalValue,
}) => {
  const truncatetitle = (name, wordLimit = 8) => {
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
            onClick={() => handleExpandClick(row._id)}
          >
            {expandedOrder === row._id ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowDown />
            )}
          </IconButton>
        </TableCell>
        <TableCell sx={tableCellName}>{row._id}</TableCell>
        <TableCell sx={tableCellStyle}>{row.orderBy}</TableCell>
        <TableCell sx={tableCellStyle}>
          {getDecimalValue(row.totalPrice)}
        </TableCell>
        <TableCell sx={tableCellStyle}>
          {row.coupon && row.coupon.discount
            ? `${row.coupon.discount}%`
            : "No Coupon"}
        </TableCell>
        <TableCell sx={tableCellStyle}>{row.paymentMethod}</TableCell>
        <TableCell>
          <FormControl
            size="small"
            sx={{ m: 1, minWidth: 80 }}
            disabled={row.paymentStatus === "Paid"}
          >
            <InputLabel id={`payment-status-label-${row._id}`}>
              Payment Status
            </InputLabel>
            <Select
              labelId={`payment-status-label-${row._id}`}
              id={`payment-status-select-${row._id}`}
              value={row.paymentStatus}
              label="Payment Status"
              onChange={(e) =>
                handleStatusChange(row._id, e.target.value, row.deliveryStatus)
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Refunded">Refunded</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl
            size="small"
            sx={{ m: 1, minWidth: 120 }} // Adjust the width as needed
          >
            <InputLabel id={`delivery-status-label-${row._id}`}>
              Delivery Status
            </InputLabel>
            <Select
              labelId={`delivery-status-label-${row._id}`}
              id={`delivery-status-select-${row._id}`}
              value={row.deliveryStatus}
              label="Delivery Status"
              onChange={(e) =>
                handleStatusChange(row._id, row.paymentStatus, e.target.value)
              }
            >
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Canceled</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </TableCell>

        <TableCell style={{ color: row.canceled ? "#ff4d4f" : "#73d13d" }}>
          {row.canceled ? "Returned" : "Not Returned"}
        </TableCell>

        <TableCell>{row.createdAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={expandedOrder === row._id} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="items details">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={tableCellStyle}>
                    Product Name
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Product Image
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Size</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Color</StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>
                    Quantity
                  </StyledTableCell>
                  <StyledTableCell sx={tableCellStyle}>Price</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.items.map((item, itemIndex) => (
                  <TableRow key={itemIndex}>
                    <TableCell
                      sx={tableCellStyle}
                      style={{
                        wordBreak: "break-word",
                        wordWrap: "break-word",
                        maxWidth: 100,
                      }}
                    >
                      {truncatetitle(item.product.name)}
                    </TableCell>
                    <TableCell>
                      <img
                        src={item.product?.colors[0]?.images[0]?.secure_url}
                        style={{ width: 50, height: 50, objectFit: "conatin" }}
                      />{" "}
                    </TableCell>
                    <TableCell>{item.selectedVariant}</TableCell>
                    <TableCell sx={tableCellStyle}>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: item.selectedColour.hexCode,
                          borderRadius: "50%",
                        }}
                      />{" "}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>₹{getDecimalValue(item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ViewOrders;
