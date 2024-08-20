"use client";

import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { detectAllFaces } from "@/utils/faceApiUtils";

export default function CameraFaceDetect() {
  const webcamRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [videoDims, setVideoDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const requestCameraPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraEnabled(true);
      } catch (error) {
        console.error("Camera permission denied:", error);
        setIsCameraEnabled(false);
      }
    };

    requestCameraPermissions();

    const capture = async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const detections = await detectAllFaces(imageSrc);
          setFaces(detections);
        }
      }
      requestAnimationFrame(capture);
    };

    if (isCameraEnabled) {
      requestAnimationFrame(capture);
    }

    return () => cancelAnimationFrame(capture);
  }, [isCameraEnabled]);

  const handleUserMedia = (stream) => {
    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings();
    setVideoDims({ width: settings.width, height: settings.height });
  };

  return (
    <section className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
      <div className="container mx-auto flex flex-col items-center">
        <div className="relative w-full max-w-full md:max-w-2xl lg:max-w-4xl">
          {isCameraEnabled ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="opacity-60 rounded"
              videoConstraints={{ facingMode: "user"}}
              onUserMedia={handleUserMedia}
            />
          ) : (
            <p className="text-red-500">Camera access denied. Please allow camera access to continue.</p>
          )}
          {faces.map((face, index) => {
            const { x, y, width, height } = face.box;
            const scaleX = videoDims.width / webcamRef.current.video.videoWidth;
            const scaleY = videoDims.height / webcamRef.current.video.videoHeight;

            return (
              <div
                key={index}
                className="absolute border-2 border-red-500"
                style={{
                  top: `${y * scaleY}px`,
                  left: `${x * scaleX}px`,
                  width: `${width * scaleX}px`,
                  height: `${height * scaleY}px`,
                }}
              >
                <span
                  className="absolute text-white bg-red-500 text-xs px-1 rounded"
                  style={{ top: "-1.0rem", left: "0" }}
                >
                  {`score: ${(face.score * 100).toFixed(2)}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
