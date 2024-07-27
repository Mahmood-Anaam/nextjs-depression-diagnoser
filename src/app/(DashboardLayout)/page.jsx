"use client";

import Link from "next/link";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { IconMoodSmile } from "@tabler/icons-react";
import VideoCapture  from "@/components/videoCapture/VideoCapture";

export default function Component() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box component="main" flex="1">
          <Box py={12} md={{ py: 20 }} lg={{ py: 24 }}>
            <Container maxWidth="lg">
              <Grid container spacing={4} md={{ spacing: 12 }}>
                <Grid item xs={12} md={6}>
                  <Box mb={4}>
                    <Typography variant="h1" component="h1" gutterBottom>
                      Revolutionize Your Mental Health Journey
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      The nextjs-depression-diagnoser is a cutting-edge
                      application that combines advanced AI technology with
                      medical expertise to provide accurate and personalized
                      depression assessments.
                    </Typography>
                    <Button
                      onClick={()=>{setOpen(true);}}
                      variant="contained"
                      color="primary"
                      href="#"
                      startIcon={<IconMoodSmile />}
                      sx={{ mt: 2 }}
                    >
                      Get Started
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/images/image1.jpg"
                    width={600}
                    height={400}
                    alt="Hero Image"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box py={12} md={{ py: 20 }} lg={{ py: 24 }}>
            <Container maxWidth="lg">
              <Grid container spacing={4} md={{ spacing: 12 }}>
                <Grid item xs={12} md={6}>
                  <Box mb={4}>
                    <Typography variant="h2" component="h2" gutterBottom>
                      Personalized Insights and Recommendations
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      Based on the results of your depression assessment, our
                      application will provide you with personalized insights
                      and recommendations to help you on your mental health
                      journey.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/images/image2.png"
                    width={600}
                    height={400}
                    alt="Feature Image 2"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>

      <VideoCapture
        onFrameCapture={(frame) => {}}
        size={{ width: 640, height: 360 }}
        allowCamera={true}
        allowFileUpload={true}
        showInDialog={true}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
