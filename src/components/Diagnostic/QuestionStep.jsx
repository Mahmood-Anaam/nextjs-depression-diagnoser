"use client";
import "regenerator-runtime/runtime";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const QuestionStep = ({
  question,
  description,
  answers,
  onNextStep,
  onAnswer,
}) => {
  const [videoActive, setVideoActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [expressions, setExpressions] = useState({});
  const [commandResults, setCommandResults] = useState(""); // Track recognized commands

  // Define voice commands based on the answers
  const commands = answers.map((answer, index) => ({
    command: [answer.toLowerCase()],
    callback: () => {
      console.log(`Recognized command: ${answer}`);
      setCommandResults(`Recognized command: ${answer}`);
      handleAnswerSelection(index);
    },
  }));

  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };
    loadModels();
  }, []);

  useEffect(() => {
    let animationFrameId;
    if (videoActive) {
      detectFace();
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [videoActive]);

  const startVideo = () => {
    setVideoActive(true);
    resetTranscript();
  };

  const stopVideo = () => {
    setVideoActive(false);
    SpeechRecognition.stopListening();
    resetTranscript();
    clearCanvas();
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const detectFace = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const detections = await faceapi
        .detectSingleFace(video)
        .withFaceExpressions();

      if (detections) {
        setExpressions(detections.expressions);

        const canvas = canvasRef.current;
        const displaySize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }
    }

    if (videoActive) {
      requestAnimationFrame(detectFace);
    }
  };

  const handleAnswerSelection = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    onAnswer(answerIndex, expressions);
    stopVideo();
    onNextStep();
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <>
      <div className="p-4 border-l border-b border-r border-gray-200 dark:border-gray-700 rounded-b-lg bg-gray-50 dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        <ul className="space-y-2">
          {answers.map((answer, i) => (
            <li key={i}>
              <div
                className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${
                  selectedAnswer === i
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {answer}
              </div>
            </li>
          ))}
        </ul>

        <div className={`mt-6 ${videoActive ? "" : "opacity-60"}`}>
          <div className="relative w-full h-72 md:h-96 bg-gray-300 rounded-lg flex items-center justify-center dark:bg-gray-700">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user",
              }}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>

        <button
          onClick={videoActive ? stopVideo : startVideo}
          className={`mt-4 w-full lg:w-auto px-6 py-3 rounded-lg text-lg font-medium tracking-wide transition-all duration-300 ${
            videoActive ? "bg-red-500 text-white" : "bg-teal-500 text-white"
          } flex items-center justify-center`}
        >
          {videoActive ? "Stop Video" : "Start Video"}
        </button>

        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {transcript}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {commandResults}
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionStep;
