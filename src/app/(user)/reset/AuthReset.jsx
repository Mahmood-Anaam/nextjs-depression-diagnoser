"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack,CircularProgress } from "@mui/material";
import SnackBar from "@/components/layout/shared/snackbar/SnackBar";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";

const AuthReset = ({ title, subtitle, subtext }) => {

  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };



  const handleResetPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      
      const response = await axios.post(`${DOMAIN}/api/users/reset`, {email: email });
      setLoading(false);
      setSnackBar({
        open: true,
        message: response?.data.message || "New password has been sent to your email successfully",
        severity: "success",
      });
      
    } catch (error) {
      setLoading(false);
      setSnackBar({
        open: true,
        message: error?.response?.data.message || "An error occurred",
        severity: "error",
      });

    }
    
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <TextField
            type="email"
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="textSecondary"
            mt={5}
          >
            We will send you an email with instructions on how to reset your
            password.
          </Typography>
        </Box>
      </Stack>
      <Box mt="25px" sx={{ display: "flex", justifyContent: "center" }}>
      {loading ? (
            <CircularProgress />
          ) : (
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={handleResetPassword}
        >
          Reset Password
        </Button>)}
      </Box>
      {subtitle}

      <SnackBar
        open={snackBar.open}
        message={snackBar.message}
        severity={snackBar.severity}
        handleClose={handleClose}
      />

    </>
  );
};

export default AuthReset;
