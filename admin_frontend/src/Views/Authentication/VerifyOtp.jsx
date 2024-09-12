import {
  Box,
  Button,
  Paper,
  Typography,
  Switch,
  TextField,
  CircularProgress,
  InputBase,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyEmail } from "../../Redux/Slices/AusthSlice";

const VerifyEmailSchema = yup.object().shape({
    otp: yup.array().of(yup.string().length(1, 'Each OTP digit must be exactly 1 character')).required('OTP is required').length(6, 'OTP must be exactly 6 digits'),
});

const VerifyOtp = () => {
const dispatch = useDispatch();
const { isVerifiedemail, isLoading } = useSelector((state) => state.auth);
const emailFromState = useSelector((state) => state.auth.registerEmail);
const [email, setEmail] = React.useState(emailFromState || '');
const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);

const otpRefs = useRef([]);

useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (emailFromState) setEmail(emailFromState);
  }, [emailFromState]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9A-Z]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
  
      if (otp[index] === "") {
        // Move focus to the previous input field if the current one is empty
        if (index > 0) {
          otpRefs.current[index - 1]?.focus();
        }
      } else {
        // Clear the current field and move focus to the previous input
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(VerifyEmailSchema),
    defaultValues: {
      otp: Array(6).fill(''),
    },
  });

  const onSubmit = async (data) => {
    const otpCode = data.otp.join('');
    const submissionData = { otp: otpCode, email: data.email };
    console.log("Submitting OTP and email:", submissionData);
    dispatch(verifyEmail(submissionData));
  };
 

const currentYear = new Date().getFullYear();

  if (isVerifiedemail) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
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
                  Verify Email
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
                  <GitHub
                    sx={{ color: "white", fontSize: "23px", margin: 2 }}
                  />
                  <Google
                    sx={{ color: "white", fontSize: "23px", margin: 2 }}
                  />
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

{/* <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                display="flex"
                justifyContent="space-between"
                maxWidth={300}
                mx="auto"
            >
               
                {Array(6).fill('').map((_, index) => (
                    <Controller
                        key={index}
                        name={`otp[${index}]`}
                        control={control}
                        render={({ field }) => (
                            <InputBase
                                {...field}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                id={`otp-${index}`}
                                inputProps={{
                                    maxLength: 1,
                                    style: {
                                        textAlign: "center",
                                        fontSize: "20px",
                                        textTransform: "uppercase",
                                    },
                                }}
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    mx: 1,
                                }}
                            />
                        )}
                    />
                ))}
            </Box>
            <Box
                sx={{
                    marginLeft: "-8px",
                    background: "transparent",
                    color: "#344767",
                    paddingY: 2,
                    position: "relative",
                }}
            >
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                >
                    VERIFY EMAIL
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
        </form> */}
         <form onSubmit={handleSubmit(onSubmit)}>
         <Box
      sx={{
        marginBottom: "16px",
        opacity: 1,
        background: "transparent",
        color: "#344767",
      }}
    >
      <Controller
        name="email"
        control={control}
        defaultValue={email}
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
      <Box display="flex" justifyContent="space-between" maxWidth={300} mx="auto">

        {Array(6).fill("").map((_, index) => (
          <Controller
            key={index}
            name={`otp[${index}]`}
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                value={otp[index]} // Use otp state for value
                onChange={(e) => {
                  field.onChange(e.target.value); // Update field value
                  handleChange(e, index); // Handle local change
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputRef={(el) => (otpRefs.current[index] = el)} // Assign ref
                id={`otp-${index}`}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "20px",
                    textTransform: "uppercase",
                  },
                }}
                sx={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  mx: 1,
                }}
              />
            )}
          />
        ))}
      </Box>
      <Box sx={{ marginLeft: "-8px", paddingY: 2, position: "relative" }}>
        <Button variant="contained" fullWidth type="submit" disabled={isLoading}>
          VERIFY EMAIL
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
        {/* <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        justifyContent="space-between"
        maxWidth={300}
        mx="auto"
      >
        {Array(6).fill('').map((_, index) => (
          <Controller
            key={index}
            name={`otp[${index}]`}
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  field.onChange(value); // Update the field value
                }}
                id={`otp-${index}`}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "20px",
                    textTransform: "uppercase",
                  },
                }}
                sx={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  mx: 1,
                }}
              />
            )}
          />
        ))}
      </Box>
      <Box
        sx={{
          marginLeft: "-8px",
          background: "transparent",
          color: "#344767",
          paddingY: 2,
          position: "relative",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isLoading}
        >
          VERIFY EMAIL
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
    </form> */}
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
                      Log In
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
    </>
  );
};

export default VerifyOtp;
