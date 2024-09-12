import {
    Box,
    Button,
  } from "@mui/material";
  import React from "react";
  import {
    AccountCircle,
    FilterTiltShift,
    Key,
    Person,
  } from "@mui/icons-material";
  import { Link } from "react-router-dom";

const AuthenticationHeader = () => {

  return (
    <>
          <Box
        sx={{
          width: "80%",
          paddingY: "2rem",
          marginX: "auto",
          padding: "0.3rem",
          alignItems: "center",
          position: "absolute",
          opacity: 1,
          top: "20px",
          background: "transparent",
          borderRadius: "0.5rem",
          boxShadow:
            "0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06);",
          backgroundColor: "rgba(255,255,255,0.8)",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <span
          style={{
            margin: 0,
            fontFamily: "Roboto",
            fontSize: "0.875rem",
            lineHeight: 1.5,
            letterSpacing: "0.02857em",
            opacity: 1,
            textTransform: "none",
            verticalAlign: "none",
            textDecoration: "none",
            color: "#344767",
            fontWeight: 700,
            paddingLeft: "10px",
          }}
        >
          ShopEase
        </span>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "felx",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <FilterTiltShift sx={{ color: "#7b809a" }} />{" "}
            <Link to={'/'}
              style={{
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
                textDecoration:'none'
              }}
            >
              Dashboard
            </Link>{" "}
          </Box>
          <Box
            sx={{
              display: "felx",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <Person sx={{ color: "#7b809a" }} />{" "}
            <span
              style={{
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Admin Profile
            </span>{" "}
          </Box>
          <Box
            sx={{
              display: "felx",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <AccountCircle sx={{ color: "#7b809a" }} />{" "}
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Sign In
            </Link>{" "}
          </Box>
          <Box
            sx={{
              display: "felx",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <Key sx={{ color: "#7b809a" }} />{" "}
            <Link
              to={"/register"}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Sign Up
            </Link>{" "}
          </Box>
        </Box>
        <Box sx={{ paddingRight: "10px" }}>
          <Button
            variant="contained"
            sx={{
              paddingY: "4px",
              paddingX: "13px",
              backgroundColor: "#272a31",
            }}
          >
            Go to Store{" "}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default AuthenticationHeader