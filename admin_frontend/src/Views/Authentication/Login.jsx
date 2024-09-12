import {
  Box,
  Button,
  Paper,
  Typography,
  Switch,
  TextField,
  CircularProgress,
} from "@mui/material";
import React from "react";
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import {
  AccountCircle,
  Copyright,
  Facebook,
  FilterTiltShift,
  GitHub,
  Google,
  Key,
  Person,
} from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import AuthenticationHeader from "../../Components/AuthenticationHeader";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Slices/AusthSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  const currentYear = new Date().getFullYear();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `
        linear-gradient(195deg, rgba(66, 66, 74, 0.6), rgba(25, 25, 25, 0.6)),
        url(${bgImage})
      `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        //filter: 'blur(2px)',
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <Box
        sx={{
          //position: "relative",
          zIndex: 1,
          color: "#000", // Ensure text is visible
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* <Header> */}
        <AuthenticationHeader />
        {/* </Header> */}

        <Box sx={{ width: "430px", paddingX: 3 }}>
          <Paper
            sx={{
              //position: "relative",
              backgroundColor: "#ffffff",
              border: "0 solid rgba(0,0,0,0.125)",
              borderRadius: "0.75rem",
              boxShadow:
                "0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06);",
              overflow: "visible",
              display: "flex",
              flexDirection: "column",
              wordWrap: "break-word",
              backgroundClip: "border-box",
              paddingX: "6px",
            }}
          >
            <Box
              sx={{
                marginX: "16px",
                marginTop: "-44px",
                padding: "16px",
                marginBottom: "16px",
                textAlign: "center",
                opacity: 1,
                background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                color: "#344767",
                borderRadius: "0.5rem",
                boXshadow:
                  "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontFamily: "Roboto",
                  color: "#ffffff",
                  margin: "8px 0px 0px 8px",
                  paddingTop: 2,
                }}
              >
                Sign in
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "8px",
                  marginBottom: "8px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  height: "60px",
                }}
              >
                <Facebook
                  sx={{ color: "white", fontSize: "23px", margin: 2 }}
                />
                <GitHub sx={{ color: "white", fontSize: "23px", margin: 2 }} />
                <Google sx={{ color: "white", fontSize: "23px", margin: 2 }} />
              </Box>
            </Box>
            <Box
              sx={{
                paddingTop: "12px",
                paddingBottom: "16px",
                paddingY: "10px",
                paddingRight: "20px",
                paddingLeft: "20px",
                opacity: 1,
                background: "transparent",
                color: "#344767",
                borderRadius: "none",
                boxShadow: "none",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    marginBottom: "16px",
                    opacity: 1,
                    background: "transparent",
                    color: "#344767",
                  }}
                >
                  {/* <TextField label={"Enter Email"} fullWidth></TextField> */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Enter Email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Box>

                <Box
                  sx={{
                    marginBottom: "16px",
                    //opacity: 1,
                    //background: "transparent",
                    color: "#344767",
                  }}
                >
                  {/* <TextField label={"Enter Password"} fullWidth></TextField> */}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Enter Password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Box>

                <Box
                  sx={{
                    marginLeft: "-8px",
                    opacity: 1,
                    background: "transparent",
                    color: "#344767",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingRight: "8px",
                    paddingLeft: "8px",
                  }}
                >
                  <Switch
                    value=""
                    //checked={}
                    //onChange={}
                    inputProps={{ "aria-label": "" }}
                  />
                  <Typography
                    sx={{
                      letterSpacing: "0.02857em",
                      color: "#7b809a",
                      fontWeight: 400,
                      cursor: "pointer",
                    }}
                  >
                    Remember me
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginLeft: "-8px",
                    opacity: 1,
                    background: "transparent",
                    color: "#344767",
                    paddingY: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                  >
                    SIGN IN
                  </Button>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                </Box>
              </form>
              <Box
                sx={{
                  marginLeft: "-8px",
                  opacity: 1,
                  background: "transparent",
                  color: "#344767",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1.5,
                    letterSpacing: "0.02857em",
                    opacity: 1,
                    verticalAlign: "unset",
                    color: "#7b809a",
                  }}
                >
                  Don't Have an Account?
                  <Link
                    to={"/register"}
                    style={{
                      color: "#1a73e8",
                      fontWeight: 600,
                      display: "inline-block",
                      textDecoration: "none",
                      paddingLeft: "10px",
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: "20px",
            justifyContent: "space-between",
            width: "78%",
            color: "#ffffff",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="white"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Copyright fontSize="small" sx={{ mr: 0.5 }} />
              {` 2020 - ${currentYear}, made with 🤍 by Shourya's Team All rights reserved.`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="body2" sx={{ paddingX: 1 }}>
              Shourya's Team
            </Typography>
            <Typography variant="body2" sx={{ paddingX: 1 }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ paddingX: 1 }}>
              Contact Us
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
