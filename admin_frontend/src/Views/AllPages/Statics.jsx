import React, { useEffect, useState } from "react";
import { Column, Pie } from "@ant-design/charts";
import { Box, capitalize, Divider, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController, LineElement, PointElement, LinearScale
} from "chart.js";
import { AccessTime, AttachMoney, Check, Group, ListAlt, Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import { authBaseUrl } from '../../Redux/Slices/AusthSlice'
// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,

  LineController, LineElement, PointElement, LinearScale
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      titleFont: {
        size: 8, // Tooltip title font size
      },
      bodyFont: {
        size: 8, // Tooltip body font size
      },
      footerFont: {
        size: 8, // Tooltip footer font size
      },
      titleColor: "#ffffff", // Tooltip title color
      bodyColor: "#ffffff", // Tooltip body color
      footerColor: "#ffffff", // Tooltip footer color
    },
    legend: {
      display: false, // This will remove the legend
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#ffffff", // X-axis labels color
        font: {
          size: 10, // X-axis labels font size (adjusted)
        },
      },
      grid: {
        color: "#ffffff", // Corrected grid line color for X-axis
        lineWidth: 0.4,
      },
    },
    y: {
      ticks: {
        color: "#ffffff", // Y-axis labels color
        font: {
          size: 13, // Y-axis labels font size (adjusted)
        },
      },
      grid: {
        color: "#ffffff", // Corrected grid line color for Y-axis
        lineWidth: 0.4,
      },
    },
  },
};

const options1 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      titleFont: { size: 8 },
      bodyFont: { size: 8 },
      footerFont: { size: 8 },
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      footerColor: '#ffffff',
    },
    legend: {
      display: false, // This will remove the legend
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff',
        font: { size: 11 },
      },
      grid: {
        color: '#ffffff',
        lineWidth: 0.5,
      },
    },
    y: {
      ticks: {
        color: '#ffffff',
        font: { size: 15 },
      },
      grid: {
        color: '#ffffff',
        lineWidth: 0.5,
      },
    },
  },
};

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const Statics = () => {
  const [tickPlacement, setTickPlacement] = useState("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = useState("middle");

  const [adminDeatils,setAdminDetails] = useState({
    weeklySalesData: [],
  });
  const token = useSelector((state)=> state.auth.token);

  const getAdminDeatils =async()=>{
    try {
      const response = await axios.get(`${authBaseUrl}/admin-stats`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminDetails(response.data);
    } catch (error) {
      console.log('error on page',error.message);
    }
  }

  useEffect(()=>{
     try {
       getAdminDeatils();
     } catch (error) {
      console.log('error',error);
     }
  },[token]);

  console.log('our detyails',adminDeatils);

const weeklySalesData = adminDeatils.weeklySalesData.map((week) => week.totalSales);

  console.log('weeklysalesdata',weeklySalesData);

  const data3 = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "",
        data:adminDeatils.monthlySalesData,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderWidth: 1,
        barThickness: 5,
        borderRadius: 10,
      },
    ],
  };

  const data2 = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        type: 'line',
        label: '',
        data: weeklySalesData ,
        borderColor: "#ffffff",
        borderWidth: 2,
        fill: false, // Do not fill the area under the line
      },
    ],
  };

  const data = {
    labels: adminDeatils.years,
    datasets: [
      {
        type: 'line',
        label: '',
        data: adminDeatils.annualSalesData,
        borderColor: "#ffffff",
        borderWidth: 2,
        fill: false, // Do not fill the area under the line
      },
    ],
  };
  return (
    <Box sx={{height:'100vh'}}>
      <Typography variant="h5" sx={{ fontWeight: 600, margin: 2 }}>
        Statics Dashboard
      </Typography>

      <Box>
        <Grid container>
          <Grid item xs={12} lg={3} xl={3} md={3}>
          <Box
            sx={{
              margin: "10px",
              color: "rgba(0,0,0,0.87)",
              display: "flex", // Corrected from 'felx' to 'flex'
              flexDirection: "column",
              position: "relative",
              overflowWrap: "break-word",
              backgroundColor: "rgba(255,255,255,1)", // Added quotes
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
              //height: "100%",
              borderColor: "rgba(0,0,0,0.125)",
              borderRadius: "0.75rem",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                color: "rgb(52,71,103)",
                display: "flex",
                flexDirection:'row',
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 8px 8px",
                opacity: 1,
                background: "transparent",
              }}
            >
             <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4rem',
    height: '4rem',
    marginTop: '-58px',
    opacity: 1,
    background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
    color: 'rgb(255, 255, 255)',
    borderRadius: '0.75rem',
    boxShadow:
      'rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem',
  }}
>
  <AttachMoney color="#ffffff" />
</Box>
              <Box sx={{paddingRight:3}}>
                <Typography sx={{lineHeight:0.3,fontFamily:'Roboto',fontSize:'0.875rem',fontWeight:300,color:'rgb(123,128,154)'}}>Revenue</Typography>
                <Typography sx={{lineHeight:2,display:"flex",justifyContent:'end',fontSize:'1.5rem',fontWeight:700,color:'rgb(52,71,103)'}} >{adminDeatils.previousMonthRevenue || '0'}K</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                padding: "0px 10px 4px",
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  lineHeight: 0.9,
                  fontWeight: 700,
                  letterSpacing: "0.0075em",
                  opacity: 1,
                  textTransform: "capitalize",
                  color: "rgb(52,71,103)",
                }}
              >
                Previous Month Revenue
              </Typography>

              <Divider
                sx={{
                  flexShrink: 0,
                  borderTop: "0px solid rgba(0,0,0,0.12)",
                  borderLeft: "0px solid rgba(0,0,0,0.12)",
                  borderRight: "0px solid rgba(0,0,0,0.12)",
                  height: "0.0625rem",
                  margin: "0.7rem 0px",
                  borderBottom: 0,
                  backgroundColor: "transparent",
                  opacity: 0.25,
                  backgroundImage:
                    "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  opacity: 1,
                  background: "transparent",
                  color: "rgb(52,71,103)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "0.875rem",
                    lineHeight: 1.9,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                    fontWeight: 300,
                    paddingBottom:1
                  }}
                >
                  <span style={{color:'rgb(76,175,80)',fontWeight:700,fontFamily:'Roboto'}}>+10% </span> than last Month
                </Typography>
              </Box>
            </Box>
          </Box>
          </Grid>
          <Grid item xs={12} lg={3} xl={3} md={3}>
          <Box
            sx={{
              margin: "10px",
              color: "rgba(0,0,0,0.87)",
              display: "flex", // Corrected from 'felx' to 'flex'
              flexDirection: "column",
              position: "relative",
              overflowWrap: "break-word",
              backgroundColor: "rgba(255,255,255,1)", // Added quotes
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
              //height: "100%",
              borderColor: "rgba(0,0,0,0.125)",
              borderRadius: "0.75rem",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                color: "rgb(52,71,103)",
                display: "flex",
                flexDirection:'row',
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 8px 8px",
                opacity: 1,
                background: "transparent",
              }}
            >
             <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4rem',
    height: '4rem',
    marginTop: '-58px',
    opacity: 1,
    background: 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))',
    color: 'rgb(255, 255, 255)',
    borderRadius: '0.75rem',
    boxShadow:
      'rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(76, 175, 79, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem',
  }}
>
  <AttachMoney color="#ffffff" />
</Box>
              <Box sx={{paddingRight:3}}>
                <Typography sx={{lineHeight:0.3,fontFamily:'Roboto',fontSize:'0.875rem',fontWeight:300,color:'rgb(123,128,154)'}}>Revenue</Typography>
                <Typography sx={{lineHeight:2,display:"flex",justifyContent:'end',fontSize:'1.5rem',fontWeight:700,color:'rgb(52,71,103)'}} >{adminDeatils.totalRevenue || '0'}K</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                padding: "0px 10px 4px",
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  lineHeight: 0.9,
                  fontWeight: 700,
                  letterSpacing: "0.0075em",
                  opacity: 1,
                  textTransform: "capitalize",
                  color: "rgb(52,71,103)",
                }}
              >
                Total Revenue
              </Typography>

              <Divider
                sx={{
                  flexShrink: 0,
                  borderTop: "0px solid rgba(0,0,0,0.12)",
                  borderLeft: "0px solid rgba(0,0,0,0.12)",
                  borderRight: "0px solid rgba(0,0,0,0.12)",
                  height: "0.0625rem",
                  margin: "0.7rem 0px",
                  borderBottom: 0,
                  backgroundColor: "transparent",
                  opacity: 0.25,
                  backgroundImage:
                    "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  opacity: 1,
                  background: "transparent",
                  color: "rgb(52,71,103)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "0.875rem",
                    lineHeight: 1.9,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                    fontWeight: 300,
                    paddingBottom:1
                  }}
                >
                  <span style={{color:'rgb(76,175,80)',fontWeight:700,fontFamily:'Roboto'}}>+2% </span> than last Month
                </Typography>
              </Box>
            </Box>
          </Box>
          </Grid>
          <Grid item xs={12} lg={3} xl={3} md={3}>
          <Box
            sx={{
              margin: "10px",
              color: "rgba(0,0,0,0.87)",
              display: "flex", // Corrected from 'felx' to 'flex'
              flexDirection: "column",
              position: "relative",
              overflowWrap: "break-word",
              backgroundColor: "rgba(255,255,255,1)", // Added quotes
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
              //height: "100%",
              borderColor: "rgba(0,0,0,0.125)",
              borderRadius: "0.75rem",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                color: "rgb(52,71,103)",
                display: "flex",
                flexDirection:'row',
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 8px 8px",
                opacity: 1,
                background: "transparent",
              }}
            >
             <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4rem',
    height: '4rem',
    marginTop: '-58px',
    opacity: 1,
    background: 'linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))',
    color: 'rgb(255, 255, 255)',
    borderRadius: '0.75rem',
    boxShadow:
      'rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(233, 30, 98, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem',
  }}
>
  <ListAlt color="#ffffff" />
</Box>
              <Box sx={{paddingRight:3}}>
                <Typography sx={{lineHeight:0.3,fontFamily:'Roboto',fontSize:'0.875rem',fontWeight:300,color:'rgb(123,128,154)'}}>Todays Orders</Typography>
                <Typography sx={{lineHeight:2,display:"flex",justifyContent:'end',fontSize:'1.5rem',fontWeight:700,color:'rgb(52,71,103)'}} >{adminDeatils.todayOrdersCount || '0'}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                padding: "0px 10px 4px",
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  lineHeight: 0.9,
                  fontWeight: 700,
                  letterSpacing: "0.0075em",
                  opacity: 1,
                  textTransform: "capitalize",
                  color: "rgb(52,71,103)",
                }}
              >
                Todays Total Orders
              </Typography>

              <Divider
                sx={{
                  flexShrink: 0,
                  borderTop: "0px solid rgba(0,0,0,0.12)",
                  borderLeft: "0px solid rgba(0,0,0,0.12)",
                  borderRight: "0px solid rgba(0,0,0,0.12)",
                  height: "0.0625rem",
                  margin: "0.7rem 0px",
                  borderBottom: 0,
                  backgroundColor: "transparent",
                  opacity: 0.25,
                  backgroundImage:
                    "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  opacity: 1,
                  background: "transparent",
                  color: "rgb(52,71,103)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "0.875rem",
                    lineHeight: 1.9,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                    fontWeight: 300,
                    paddingBottom:1
                  }}
                >
                  <span style={{color:'rgb(76,175,80)',fontWeight:700,fontFamily:'Roboto'}}>+1% </span> than last Day
                </Typography>
              </Box>
            </Box>
          </Box>
          </Grid>
          <Grid item xs={12} lg={3} xl={3} md={3}>
          <Box
            sx={{
              margin: "10px",
              color: "rgba(0,0,0,0.87)",
              display: "flex", // Corrected from 'felx' to 'flex'
              flexDirection: "column",
              position: "relative",
              overflowWrap: "break-word",
              backgroundColor: "rgba(255,255,255,1)", // Added quotes
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
              //height: "100%",
              borderColor: "rgba(0,0,0,0.125)",
              borderRadius: "0.75rem",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
                display: "flex",
                flexDirection:'row',
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 8px 8px",
              }}
            >
             <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4rem',
    height: '4rem',
    marginTop: '-58px',
    opacity: 1,
    background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
    color: 'rgb(255, 255, 255)',
    borderRadius: '0.75rem',
    boxShadow:
      'rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem',
  }}
>
  <Group color="#ffffff" />
</Box>
              <Box sx={{paddingRight:3}}>
                <Typography sx={{lineHeight:0.3,fontFamily:'Roboto',fontSize:'0.875rem',fontWeight:300,color:'rgb(123,128,154)'}}>Customers</Typography>
                <Typography sx={{lineHeight:2,display:"flex",justifyContent:'end',fontSize:'1.5rem',fontWeight:700,color:'rgb(52,71,103)'}} >{adminDeatils.totalUsers || '0'}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                padding: "0px 10px 4px",
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  lineHeight: 0.9,
                  fontWeight: 700,
                  letterSpacing: "0.0075em",
                  opacity: 1,
                  textTransform: "capitalize",
                  color: "rgb(52,71,103)",
                }}
              >
                Total Users
              </Typography>

              <Divider
                sx={{
                  flexShrink: 0,
                  borderTop: "0px solid rgba(0,0,0,0.12)",
                  borderLeft: "0px solid rgba(0,0,0,0.12)",
                  borderRight: "0px solid rgba(0,0,0,0.12)",
                  height: "0.0625rem",
                  margin: "0.7rem 0px",
                  borderBottom: 0,
                  backgroundColor: "transparent",
                  opacity: 0.25,
                  backgroundImage:
                    "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  opacity: 1,
                  background: "transparent",
                  color: "rgb(52,71,103)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "0.875rem",
                    lineHeight: 1.9,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                    fontWeight: 300,
                    paddingBottom:1
                  }}
                >
                  <span style={{color:'rgb(76,175,80)',fontWeight:700,fontFamily:'Roboto'}}>+4% </span> than last Year
                </Typography>
              </Box>
            </Box>
          </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container sx={{ marginTop: 10 }}>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <Box
            sx={{
              margin: "10px",
              color: "rgba(0,0,0,0.87)",
              display: "flex", // Corrected from 'felx' to 'flex'
              flexDirection: "column",
              position: "relative",
              overflowWrap: "break-word",
              backgroundColor: "rgba(255,255,255,1)", // Added quotes
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
              //height: "100%",
              borderColor: "rgba(0,0,0,0.125)",
              borderRadius: "0.75rem",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
                marginX:3
              }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  borderRadius: 9,
                  backgroundColor: "#3e98ef",
                  padding: "10px",
                  marginTop: "-50px",
                  height: "12.5rem",
                  paddingBottom: "16px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "20px",
                  opacity: 1,
                  // width: "100%",
                  // height: "100%",
                  objectFit: "contain",
                  background:'linear-gradient(195deg, rgb(73,163,241), rgb(26,115,232)',
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.31255rem",
                }}
              >
                <Bar data={data3} options={options} color="#ffffff" />
              </div>
            </Box>
            <Box
              sx={{
                padding: "24px 8px 8px",
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
                marginX:3
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  lineHeight: 1.625,
                  fontWeight: 700,
                  letterSpacing: "0.0075em",
                  opacity: 1,
                  textTransform: "capitalize",
                  color: "rgb(52,71,103)",
                }}
              >
                Monthly Sales
              </Typography>
              <Typography
                sx={{
                  margin: 0,
                  fontSize: "0.875rem",
                  fontFamily: "Roboto",
                  lineHeight: 1.5,
                  fontWeight: 300,
                  letterSpacing: "0.02857em",
                  opacity: 1,
                  textTransform: "none",
                  color: "rgb(123,128,154)",
                }}
              >
                Current Year Performance
              </Typography>

              <Divider
                sx={{
                  flexShrink: 0,
                  borderTop: "0px solid rgba(0,0,0,0.12)",
                  borderLeft: "0px solid rgba(0,0,0,0.12)",
                  borderRight: "0px solid rgba(0,0,0,0.12)",
                  height: "0.0625rem",
                  margin: "1rem 0px",
                  borderBottom: 0,
                  backgroundColor: "transparent",
                  opacity: 0.25,
                  backgroundImage:
                    "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  opacity: 1,
                  background: "transparent",
                  color: "rgb(52,71,103)",
                }}
              >
                <AccessTime
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                    fontWeight: 300,
                  }}
                >
                  Updated 2 days ago
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <Box
            sx={{
              margin: "10px",
              color: "rgba(0,0,0,0.87)",
              display: "flex", // Corrected from 'felx' to 'flex'
              flexDirection: "column",
              position: "relative",
              overflowWrap: "break-word",
              backgroundColor: "rgba(255,255,255,1)", // Added quotes
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
              //height: "100%",
              borderColor: "rgba(0,0,0,0.125)",
              borderRadius: "0.75rem",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
                marginX:3
              }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  borderRadius: 9,
                  //backgroundColor: "#3e98ef",
                  padding: "10px",
                  marginTop: "-50px",
                  height: "12.5rem",
                  paddingBottom: "16px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "20px",
                  opacity: 1,
                  // width: "100%",
                  // height: "100%",
                  objectFit: "contain",
                  background:'linear-gradient(195deg, rgb(102,187,106), rgb(67,160,71)',
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(76, 175, 79, 0.4) 0rem 0.4375rem 0.625rem -0.31255rem",
                }}
              >
                <Bar data={data} options={options1} color="#ffffff" />
                {/* <Bar data={data3} options={options} color="#ffffff" /> */}
              </div>
            </Box>
            <Box
              sx={{
                padding: "24px 8px 8px",
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
                marginX:3
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  lineHeight: 1.625,
                  fontWeight: 700,
                  letterSpacing: "0.0075em",
                  opacity: 1,
                  textTransform: "capitalize",
                  color: "rgb(52,71,103)",
                }}
              >
                Yealy Sales
              </Typography>
              <Typography
                sx={{
                  margin: 0,
                  fontSize: "0.875rem",
                  fontFamily: "Roboto",
                  lineHeight: 1.5,
                  fontWeight: 300,
                  letterSpacing: "0.02857em",
                  opacity: 1,
                  textTransform: "none",
                  color: "rgb(123,128,154)",
                }}
              >
                Previous Year Performance
              </Typography>

              <Divider
                sx={{
                  flexShrink: 0,
                  borderTop: "0px solid rgba(0,0,0,0.12)",
                  borderLeft: "0px solid rgba(0,0,0,0.12)",
                  borderRight: "0px solid rgba(0,0,0,0.12)",
                  height: "0.0625rem",
                  margin: "1rem 0px",
                  borderBottom: 0,
                  backgroundColor: "transparent",
                  opacity: 0.25,
                  backgroundImage:
                    "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  opacity: 1,
                  background: "transparent",
                  color: "rgb(52,71,103)",
                }}
              >
                <AccessTime
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                    fontWeight: 300,
                  }}
                >
                  Updated 2 days ago
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <Box
            sx={{
              margin: "10px",
              color: "rgba(0,0,0,0.87)",
              display: "flex", // Corrected from 'felx' to 'flex'
              flexDirection: "column",
              position: "relative",
              overflowWrap: "break-word",
              backgroundColor: "rgba(255,255,255,1)", // Added quotes
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
              //height: "100%",
              borderColor: "rgba(0,0,0,0.125)",
              borderRadius: "0.75rem",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
                marginX:3
              }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  borderRadius: 9,
                  backgroundColor: "#3e98ef",
                  padding: "10px",
                  marginTop: "-50px",
                  height: "12.5rem",
                  paddingBottom: "16px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "20px",
                  opacity: 1,
                  // width: "100%",
                  // height: "100%",
                  objectFit: "contain",
                  background:'linear-gradient(195deg, rgb(66,66,74), rgb(25,25,25)',
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.31255rem",
                }}
              >
                <Bar data={data2} options={options1} color="#ffffff" />
              </div>
            </Box>
            <Box
              sx={{
                padding: "24px 8px 8px",
                opacity: 1,
                background: "transparent",
                color: "rgb(52,71,103)",
                marginX:3
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  lineHeight: 1.625,
                  fontWeight: 700,
                  letterSpacing: "0.0075em",
                  opacity: 1,
                  textTransform: "capitalize",
                  color: "rgb(52,71,103)",
                }}
              >
                Weekly Sales
              </Typography>
              <Typography
                sx={{
                  margin: 0,
                  fontSize: "0.875rem",
                  fontFamily: "Roboto",
                  lineHeight: 1.5,
                  fontWeight: 300,
                  letterSpacing: "0.02857em",
                  opacity: 1,
                  textTransform: "none",
                  color: "rgb(123,128,154)",
                }}
              >
                EveryDay Performance
              </Typography>

              <Divider
                sx={{
                  flexShrink: 0,
                  borderTop: "0px solid rgba(0,0,0,0.12)",
                  borderLeft: "0px solid rgba(0,0,0,0.12)",
                  borderRight: "0px solid rgba(0,0,0,0.12)",
                  height: "0.0625rem",
                  margin: "1rem 0px",
                  borderBottom: 0,
                  backgroundColor: "transparent",
                  opacity: 0.25,
                  backgroundImage:
                    "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  opacity: 1,
                  background: "transparent",
                  color: "rgb(52,71,103)",
                }}
              >
                <AccessTime
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    opacity: 1,
                    color: "rgb(123,128,154)",
                    fontWeight: 300,
                  }}
                >
                  Updated 1 days ago
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} lg={8} xl={8} md={8}>
<Paper elevation={2} sx={{borderRadius:3,marginX:1}}>
<Box sx={{width:'100%',height:'100px',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px'}}>
  <Box>
  <Typography variant="h6" sx={{fontSize:'1rem',fontWeight:700,color:'rgb(52,71,103)'}}>Recent Orders</Typography>
<Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
  <Check sx={{color:'rgb(76,175,80)',fontWeight:700}} />
  <Typography sx={{fontSize:'0.875rem',opacity:1,color:'rgb(123,128,154)'}}>20 Orders Completed Today</Typography> </Box>
</Box>
<Box>
<Visibility />
</Box>
  </Box>

<Box>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Products Name</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Total Price</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Box>
</Paper>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={4}>
        <Paper elevation={2} sx={{borderRadius:3,marginX:1}}>
        <Box sx={{width:'100%',height:'100px',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px'}}>
  <Box>
  <Typography variant="h6" sx={{fontSize:'1rem',fontWeight:700,color:'rgb(52,71,103)'}}>Orders Return</Typography>
<Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
  <Check sx={{color:'rgb(76,175,80)',fontWeight:700}} />
  <Typography sx={{fontSize:'0.875rem',opacity:1,color:'rgb(123,128,154)'}}>20 Orders Return Today</Typography> </Box>
</Box>
<Box>
<Visibility />
</Box>
  </Box>
  <Box>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Products Name</StyledTableCell>
            <StyledTableCell align="right">Total Price</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  </Paper>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default Statics;
