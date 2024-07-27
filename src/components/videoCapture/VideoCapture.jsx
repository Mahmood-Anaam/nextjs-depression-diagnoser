"use client";

import * as React from "react";
import * as faceapi from 'face-api.js';
import {
  Box,
  TextField,
  MenuItem,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const VideoCapture = ({
  onFrameCapture = null,
  size = { width: 640, height: 360 },
  allowCamera = true,
  allowFileUpload = true,
  showInDialog = true,
  open = false,
  onClose = null,
}) => {
  const [cameras, setCameras] = React.useState([]);
  const [inputSource, setInputSource] = React.useState("none");
  const [fileInput, setFileInput] = React.useState(null);
  const [stream, setStream] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const videoRef = React.useRef();
  const fileInputRef = React.useRef();
  const canvasRef = React.useRef();

  React.useEffect(() => {
    async function getCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameras(videoDevices);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    }
    if (allowCamera) {
      getCameras();
    }
  }, [allowCamera]);

  React.useEffect(() => {
    async function loadModels() {
      const MODEL_URL = '/models';
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    }
    loadModels();
  }, []);

  React.useEffect(() => {
    if (inputSource && cameras.some((cam) => cam.deviceId === inputSource)) {
      async function startCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: inputSource, width: size.width, height: size.height },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setStream(stream);
        } catch (error) {
          console.error("Error accessing the camera.", error);
        }
      }
      startCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [inputSource, cameras, size]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === "file") {
      fileInputRef.current.click();
    } else {
      setInputSource(value);
      setFileInput(null);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    selectedFiles.forEach((file) => {
      const existingFileIndex = files.findIndex(
        (f) => f.name === file.name && f.lastModified === file.lastModified
      );
      if (existingFileIndex === -1) {
        setFiles((prevFiles) => [...prevFiles, file]);
      }
    });
    setFileInput(selectedFiles[0]);
    setInputSource(selectedFiles[0].name);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleFileSelection = (event) => {
    const fileName = event.target.value;
    const selectedFile = files.find((file) => file.name === fileName);
    if (selectedFile) {
      setFileInput(selectedFile);
      setInputSource(fileName);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } else if (fileName === "none") {
      setInputSource("none");
      setFileInput(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const handleVideoLoaded = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const captureFrame = async () => {
      if (video.paused || video.ended) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);
      const detections = await faceapi.detectAllFaces(video).withFaceExpressions();

      faceapi.matchDimensions(canvas, {
        width: video.videoWidth,
        height: video.videoHeight,
      });
      const resizedDetections = faceapi.resizeResults(detections, {
        width: video.videoWidth,
        height: video.videoHeight,
      });

      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
      resizedDetections.forEach((detection) => {
        const { x, y, width, height } = detection.detection.box;
        context.strokeStyle = "#00FF00";
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);

        const expression = detection.expressions.asSortedArray()[0].expression;
        context.fillStyle = "#00FF00";
        context.fillText(expression, x, y - 10);
      });

      if (onFrameCapture) {
        const frame = canvas.toDataURL("image/jpeg");
        onFrameCapture(frame);
      }

      
    };
    setInterval(captureFrame,5);
   
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setInputSource("none");
    setFileInput(null);

    if (onClose) {
      onClose();
    }
  };

  const videoElement = (
    <Box mt={4} position="relative" width={size.width} height={size.height}>
      {fileInput && (
        <video
          key={fileInput.name}
          controls
          playsInline
          width={size.width}
        height={size.height}
          src={URL.createObjectURL(fileInput)}
          ref={videoRef}
          onLoadedData={handleVideoLoaded}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
      {!fileInput &&
        inputSource &&
        cameras.some((cam) => cam.deviceId === inputSource) && (
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            width={"100%"}
            height={"100%"}
            onLoadedData={handleVideoLoaded}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        )}
      {!fileInput && inputSource === "none" && (
        <video
          controls
          autoPlay
          playsInline
          width={size.width}
          height={size.height}
          style={{ backgroundColor: "black", position: "absolute", top: 0, left: 0 }}
        />
      )}
      <canvas
        ref={canvasRef}
        width={size.width}
        height={size.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </Box>
  );

  const content = (
    <Container>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          select
          label="Select Video Source"
          value={inputSource}
          onChange={(event) => {
            handleInputChange(event);
            handleFileSelection(event);
          }}
          helperText="Please select your camera or choose a file"
          variant="outlined"
          fullWidth
          margin="normal"
        >
          <MenuItem value="none">None</MenuItem>
          {allowCamera &&
            cameras.map((option) => (
              <MenuItem key={option.deviceId} value={option.deviceId}>
                {option.label || `Camera ${option.deviceId}`}
              </MenuItem>
            ))}
          {files.map((file, index) => (
            <MenuItem key={index} value={file.name}>
              {file.name}
            </MenuItem>
          ))}
          {allowFileUpload && (
            <MenuItem value="file">Choose a video file...</MenuItem>
          )}
        </TextField>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          multiple
          onChange={handleFileChange}
        />
        {videoElement}
      </Box>
    </Container>
  );

  return (
    <>
      {showInDialog ? (
        <>
          <Dialog open={open} maxWidth="md" scroll="body">
            <DialogTitle>Video Capture Component</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions spacing={true}>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        content
      )}
    </>
  );
};

export default VideoCapture;
