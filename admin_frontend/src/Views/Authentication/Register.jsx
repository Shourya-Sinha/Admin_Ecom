import {
  Box,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import React from "react";
import bgImagesinup from "../../assets/images/bg-sign-up-cover.jpeg";
import { CheckBox, Copyright } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import AuthenticationHeader from "../../Components/AuthenticationHeader";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { registerUser } from "../../Redux/Slices/AusthSlice";

const Register = () => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const {isRegisterSuccessfull,isLoading} = useSelector((state)=> state.auth);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name should only contain letters")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name should only contain letters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phoneNo: Yup.string()
      .matches(/^\d{10}$/, "Phone Number should be exactly 10 digits") // Adjust regex as needed
      .required("Phone Number is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    dispatch(registerUser(data));
  };
if(isRegisterSuccessfull){
  return <Navigate to={'/verify-otp'} />
}
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100vw",
          height: "45vh",
          backgroundImage: `
      linear-gradient(195deg, rgba(66, 66, 74, 0.4), rgba(25, 25, 25, 0.4)),
      url(${bgImagesinup})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          //filter: 'blur(2px)',
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          padding: "20px",
        }}
      ></Box>
      <Box
        sx={{
          position: "relative",
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

        <Box
          sx={{ width: "440px", paddingX: 3, display: "flex", marginTop: 15 }}
        >
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
                padding: "30px",
                marginBottom: "16px",
                textAlign: "center",
                opacity: 1,
                background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                color: "#344767",
                borderRadius: "0.5rem",
                boxShadow:
                  "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.20), 0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.6)",
                backgroundColor: "#fff",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontFamily: "Roboto",
                  color: "#ffffff",
                  margin: "8px 0px 0px 8px",
                }}
              >
                Join us today
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: "13px",
                  fontFamily: "Roboto",
                  color: "#ffffff",
                  margin: "8px 0px 0px 8px",
                }}
              >
                Enter your Details to Join us your data secured
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <Box
                sx={{
                  marginBottom: "16px",
                  opacity: 1,
                  background: "transparent",
                  color: "#344767",
                  display: "flex",
                  flexDirection: "row",
                  paddingY: "10px",
                }}
              >
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root::before": {
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <InputLabel
                    htmlFor="firstName"
                    sx={{
                      fontSize: "13px",
                      lineHeight: 3,
                      padding: 0,
                      margin: "-13px",
                    }}
                  >
                    First Name
                  </InputLabel>
                  <Input
                    id="firstName"
                    {...field}
                    aria-describedby="firstName-helper-text"
                    sx={{ "& .MuiInputBase-input": { padding: "0px" } }}
                  />
                  {errors.firstName && (
                    <FormHelperText error>{errors.firstName.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
                </Box>
                <Box sx={{ display: "flex", flexGrow: 1, paddingLeft: 1 }}>
                <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root::before": {
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <InputLabel
                    htmlFor="lastName"
                    sx={{
                      fontSize: "13px",
                      lineHeight: 3,
                      padding: 0,
                      margin: "-13px",
                    }}
                  >
                    Last Name
                  </InputLabel>
                  <Input
                    id="lastName"
                    {...field}
                    aria-describedby="lastName-helper-text"
                    sx={{ "& .MuiInputBase-input": { padding: "0px" } }}
                  />
                  {errors.lastName && (
                    <FormHelperText error>{errors.lastName.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
                </Box>
              </Box>
              <Box
                sx={{
                  paddingY: "6px",
                  marginBottom: "16px",
                  opacity: 1,
                  background: "transparent",
                  color: "#344767",
                }}
              >
                <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={{
                  "& .MuiInputBase-root::before": {
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                  },
                }}
              >
                <InputLabel
                  htmlFor="email"
                  sx={{
                    fontSize: "13px",
                    lineHeight: 3,
                    padding: 0,
                    margin: "-13px",
                  }}
                >
                  Email
                </InputLabel>
                <Input
                  id="email"
                  {...field}
                  aria-describedby="email-helper-text"
                  sx={{ "& .MuiInputBase-input": { padding: "0px" } }}
                />
                {errors.email && (
                  <FormHelperText error>{errors.email.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
              </Box>

              <Box
                sx={{
                  marginBottom: "16px",
                  //opacity: 1,
                  //background: "transparent",
                  color: "#344767",
                  paddingY: "6px",
                }}
              >
                <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={{
                  "& .MuiInputBase-root::before": {
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                  },
                }}
              >
                <InputLabel
                  htmlFor="password"
                  sx={{
                    fontSize: "13px",
                    lineHeight: 3,
                    padding: 0,
                    margin: "-13px",
                  }}
                >
                  Password
                </InputLabel>
                <Input
                  id="password"
                  type="password"
                  {...field}
                  aria-describedby="password-helper-text"
                  sx={{ "& .MuiInputBase-input": { padding: "0px" } }}
                />
                {errors.password && (
                  <FormHelperText error>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
              </Box>
              <Box
                sx={{
                  marginBottom: "16px",
                  //opacity: 1,
                  //background: "transparent",
                  color: "#344767",
                  paddingY: "6px",
                }}
              >
                <Controller
            name="phoneNo"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={{
                  "& .MuiInputBase-root::before": {
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                  },
                }}
              >
                <InputLabel
                  htmlFor="phoneNo"
                  sx={{
                    fontSize: "13px",
                    lineHeight: 3,
                    padding: 0,
                    margin: "-13px",
                  }}
                >
                  Phone Number
                </InputLabel>
                <Input
                  id="phoneNo"
                  {...field}
                  aria-describedby="phoneNo-helper-text"
                  sx={{ "& .MuiInputBase-input": { padding: "0px" } }}
                />
                {errors.phoneNo && (
                  <FormHelperText error>{errors.phoneNo.message}</FormHelperText>
                )}
              </FormControl>
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
                  paddingY: "6px",
                }}
              >
                <CheckBox
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
                    marginLeft: "8px",
                  }}
                >
                  I agree the{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    Terms and Condition
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ position: 'relative', display: 'inline-flex',width:'100%'}}>
  <Button variant="contained" fullWidth type="submit" disabled={isLoading}>
    SIGN UP
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
 {/* <Box
                sx={{
                  marginLeft: "-8px",
                  opacity: 1,
                  background: "transparent",
                  color: "#344767",
                  paddingY: 2,
                }}
              >
                <Button variant="contained" fullWidth type="submit" disabled={isLoading}>
                SIGN UP
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
              </Box> */}

              {/* <Box
                sx={{
                  marginLeft: "-8px",
                  opacity: 1,
                  background: "transparent",
                  color: "#344767",
                  paddingY: 3,
                }}
              >
                <Button variant="contained" fullWidth type="submit" disabled={isLoading}>
                  SIGN UP
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
              </Box> */}

              <Box
                sx={{
                  marginLeft: "-8px",
                  opacity: 1,
                  background: "transparent",
                  color: "#344767",
                  display: "flex",
                  justifyContent: "center",
                  paddingY: "6px",
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
                  Already Have an Account?
                  <Link
                    to={"/login"}
                    style={{
                      color: "#1a73e8",
                      fontWeight: 600,
                      display: "inline-block",
                      textDecoration: "none",
                      paddingLeft: "10px",
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
            </form>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: "20px",
            justifyContent: "space-between",
            width: "78%",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Copyright fontSize="small" sx={{ mr: 0.5 }} />
              {` 2020 - ${currentYear}, made with 🖤 by Shourya's Team All rights reserved.`}
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

export default Register;
