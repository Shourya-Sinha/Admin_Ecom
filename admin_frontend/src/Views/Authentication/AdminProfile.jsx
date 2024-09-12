import {
  Box,
  Typography,
  Stack,
  Avatar,
  Grid,
  Switch,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import bgImagesinup from "../../assets/images/bg-profile.jpeg";
import {
  CheckBox,
  Copyright,
  Edit,
  Email,
  Facebook,
  Home,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { RedEnvelopeFilled, SettingFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { authBaseUrl } from "../../Redux/Slices/AusthSlice";

const AdminProfile = () => {
  const currentYear = new Date().getFullYear();
  const [adminDeatils,setAdminDetails] = useState({});
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
  return (
    <>
      <Box sx={{ width: "100%", height: "100%", overflowX: "hidden" }}>
        <Box
          sx={{
            width: "100%",
            height: "33vh",
            backgroundImage: `
      linear-gradient(195deg, rgba(73, 163, 241, 0.6), rgba(26, 115, 232, 0.6)),
      url(${bgImagesinup})
    `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            //position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
            borderRadius: 3,
          }}
        ></Box>
        <Box
          sx={{
            border: "1px solid black",
            zIndex: 1,
            position: "relative",
            marginTop: -8,
            marginX: 3,
            borderRadius: 3,
            backgroundColor: "rgb(32,41,64)",
            color: "#ffffff",
          }}
        >
          {/* hEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: 3,
              marginX: 3,
              marginY: 2,
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
            >
              <Avatar />
              <Stack direction={"column"} alignItems={"baseline"}>
                <Typography
                  variant={"h6"}
                  sx={{ fontSize: "1.25rem", fontWeight: 600 }}
                >
                  {adminDeatils.adminDetails.firstName + " " + adminDeatils.adminDetails.lastName || 'N/A'}
                </Typography>
                <Typography
                  variant={"subtitle2"}
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  CEO/ Co-Founder
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                <Home />
                <Typography sx={{ marginBottom: 0, lineHeight: 0.6 }}>
                  Home
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                spacing={0.5}
                alignItems={"center"}
                marginX={2}
              >
                <Email />
                <Typography>Message</Typography>
              </Stack>
              <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                <SettingFilled />
                <Typography>Settings</Typography>
              </Stack>
            </Box>
          </Box>

          {/* Body */}

          <Grid container>
            <Grid
              item
              xs={12}
              lg={4}
              md={4}
              xl={4}
              sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.25)" }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: 600 }}
                marginX={7}
              >
                App Settings
              </Typography>
              <Box marginX={7} marginTop={2}>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.75rem", fontWeight: 700 }}
                  marginY={2}
                >
                  ACCOUNT
                </Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Switch />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", fontWeight: 400, marginLeft: 2 }}
                  >
                    Two-factor authentication
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Switch />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", fontWeight: 400, marginLeft: 2 }}
                  >
                    Email me when someone follows me
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Switch />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", fontWeight: 400, marginLeft: 2 }}
                  >
                    Email me when someone follows me
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.75rem", fontWeight: 700, marginY: 2 }}
                >
                  APPLICATION
                </Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Switch />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", fontWeight: 400, marginLeft: 2 }}
                  >
                    When someone mentions email me
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Switch />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", fontWeight: 400, marginLeft: 2 }}
                  >
                    Email me when someone follows me
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Switch />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", fontWeight: 400, marginLeft: 2 }}
                  >
                    Email me when someone follows me
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              lg={4}
              md={4}
              xl={4}
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.25)",
                paddingX: 3,
              }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1rem", fontWeight: 600 }}
                >
                  Profile Information
                </Typography>
                <Edit />
              </Stack>
              <Box sx={{ marginLeft: 1, marginY: 2 }}>
                <Typography sx={{ fontSize: "0.875rem" }}>
                  {" "}
                  You are a software developer from Bihar, India, with expertise
                  in Java, HTML, CSS, and Thymeleaf. You are passionate about
                  ethical hacking and aspire to excel in this field. Your work
                  often involves front-end design, backend logic, and
                  integrating security best practices.{" "}
                </Typography>
              </Box>
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
                    "linear-gradient(to right, rgba(52, 71, 103, 0), rgb(255, 255, 255), rgba(52, 71, 103, 0)) !important",
                }}
              />

              <Box sx={{ marginX: 1, marginY: 3 }}>
                <Stack direction={"row"} alignItems={"center"} paddingY={1}>
                  <Typography
                    sx={{
                      color: "rgb(255,255,255)",
                      fontSize: "0.875rem",
                      textTransform: "capitalize",
                      fontWeight: 700,
                    }}
                  >
                    Full Name &nbsp;:{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    &nbsp; {adminDeatils.adminDetails.firstName + " " + adminDeatils.adminDetails.lastName || 'N/A'}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} paddingY={1}>
                  <Typography
                    sx={{
                      color: "rgb(255,255,255)",
                      fontSize: "0.875rem",
                      textTransform: "capitalize",
                      fontWeight: 700,
                    }}
                  >
                    Email &nbsp;:{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    &nbsp; {adminDeatils.adminDetails.email || 'N/A'}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} paddingY={1}>
                  <Typography
                    sx={{
                      color: "rgb(255,255,255)",
                      fontSize: "0.875rem",
                      textTransform: "capitalize",
                      fontWeight: 700,
                    }}
                  >
                    Mobile &nbsp;:{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    &nbsp; +91 {adminDeatils.adminDetails.phoneNo || 'N/A'}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} paddingY={1}>
                  <Typography
                    sx={{
                      color: "rgb(255,255,255)",
                      fontSize: "0.875rem",
                      textTransform: "capitalize",
                      fontWeight: 700,
                    }}
                  >
                    Location &nbsp;:{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    &nbsp; India, NewDelhi, Tilak Nagar
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} paddingY={1}>
                  <Typography
                    sx={{
                      color: "rgb(255,255,255)",
                      fontSize: "0.875rem",
                      textTransform: "capitalize",
                      fontWeight: 700,
                    }}
                  >
                    Social &nbsp;:{" "}
                  </Typography>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    alignItems={"center"}
                    paddingLeft={3}
                  >
                    <Facebook sx={{ fontSize: 22 }} />
                    <Twitter sx={{ fontSize: 22 }} />
                    <Instagram sx={{ fontSize: 22 }} />
                  </Stack>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} lg={4} md={4} xl={4}>
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: 600 }}
                marginX={2}
              >
                Conversations
              </Typography>

              <Box sx={{ marginX: 2, paddingY: 2, paddingX: 3 }}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  paddingY={2}
                >
                  <Stack direction={"row"} spacing={1}>
                    <Avatar />
                    <Stack direction={"column"}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "rgb(255,255,255)",
                        }}
                      >
                        Shourya S.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        Hi i need more information
                      </Typography>
                    </Stack>
                  </Stack>
                  <a>Reply</a>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  paddingBottom={2}
                >
                  <Stack direction={"row"} spacing={1}>
                    <Avatar />
                    <Stack direction={"column"}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "rgb(255,255,255)",
                        }}
                      >
                        Shourya S.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        Hi i need more information
                      </Typography>
                    </Stack>
                  </Stack>
                  <a>Reply</a>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  paddingBottom={2}
                >
                  <Stack direction={"row"} spacing={1}>
                    <Avatar />
                    <Stack direction={"column"}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "rgb(255,255,255)",
                        }}
                      >
                        Shourya S.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        Hi i need more information
                      </Typography>
                    </Stack>
                  </Stack>
                  <a>Reply</a>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  paddingBottom={2}
                >
                  <Stack direction={"row"} spacing={1}>
                    <Avatar />
                    <Stack direction={"column"}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "rgb(255,255,255)",
                        }}
                      >
                        Shourya S.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        Hi i need more information
                      </Typography>
                    </Stack>
                  </Stack>
                  <a>Reply</a>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  paddingBottom={2}
                >
                  <Stack direction={"row"} spacing={1}>
                    <Avatar />
                    <Stack direction={"column"}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "rgb(255,255,255)",
                        }}
                      >
                        Shourya S.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        Hi i need more information
                      </Typography>
                    </Stack>
                  </Stack>
                  <a>Reply</a>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  paddingBottom={2}
                >
                  <Stack direction={"row"} spacing={1}>
                    <Avatar />
                    <Stack direction={"column"}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "rgb(255,255,255)",
                        }}
                      >
                        Shourya S.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        Hi i need more information
                      </Typography>
                    </Stack>
                  </Stack>
                  <a>Reply</a>
                </Stack>{" "}
                bv
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AdminProfile;
