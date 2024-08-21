"use client";
import "regenerator-runtime/runtime";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import QuestionStep from "./QuestionStep";
import questions from "./questions";

export default function DiagnosticStepper() {
  // const [currentStep, setCurrentStep] = useState(0);
  // const [videoActive, setVideoActive] = useState(false);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  // const webcamRef = useRef(null);
  // const canvasRef = useRef(null);
  // const [expressions, setExpressions] = useState({});
  // const [transcript, setTranscript] = useState("");

  // const commands = questions[currentStep].answers.map((answer, index) => ({
  //   command: answer.toLowerCase(),
  //   callback: () => {
  //     setSelectedAnswer(index);
  //     handleAnswerSelection(answer);
  //   },
  // }));

  // const { resetTranscript } = useSpeechRecognition({ commands });

  // useEffect(() => {
  //   const loadModels = async () => {
  //     await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  //     await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  //   };
  //   loadModels();
  // }, []);

  // useEffect(() => {
  //   let animationFrameId;
  //   if (videoActive) {
  //     detectFace();
  //     SpeechRecognition.startListening({ continuous: true });
  //   } else {
  //     SpeechRecognition.stopListening();
  //     clearCanvas();
  //   }

  //   return () => {
  //     if (animationFrameId) {
  //       cancelAnimationFrame(animationFrameId);
  //     }
  //   };
  // }, [videoActive]);

  // const startVideo = () => {
  //   setVideoActive(true);
  //   resetTranscript();
  // };

  // const stopVideo = () => {
  //   setVideoActive(false);
  //   resetTranscript();
  //   clearCanvas();
  // };

  // const clearCanvas = () => {
  //   if (canvasRef.current) {
  //     const context = canvasRef.current.getContext("2d");
  //     context.clearRect(
  //       0,
  //       0,
  //       canvasRef.current.width,
  //       canvasRef.current.height
  //     );
  //   }
  // };

  // const detectFace = async () => {
  //   if (webcamRef.current && webcamRef.current.video.readyState === 4) {
  //     const video = webcamRef.current.video;
  //     const detection = await faceapi
  //       .detectSingleFace(video)
  //       .withFaceExpressions();

  //     if (detection) {
  //       setExpressions(detection.expressions);

  //       const canvas = canvasRef.current;
  //       const displaySize = {
  //         // width: 1280,
  //         // height: 720
  //         width: video.videoWidth,
  //         height: video.videoHeight,
  //       };

  //       faceapi.matchDimensions(canvas, displaySize);

  //       const resizedDetection = faceapi.resizeResults(detection, displaySize);
  //       const context = canvas.getContext("2d");
  //       context.clearRect(0, 0, canvas.width, canvas.height);

  //       faceapi.draw.drawDetections(canvas, resizedDetection);
  //       faceapi.draw.drawFaceExpressions(canvas, resizedDetection);
  //     }
  //   }

  //   if (videoActive) {
  //     requestAnimationFrame(detectFace);
  //   }
  // };

  // const handleAnswerSelection = (answer) => {
  //   setSelectedAnswer(answer);
  //   stopVideo();
  //   nextStep();
  // };

  // const nextStep = () => {
  //   setVideoActive(false);
  //   if (currentStep < questions.length - 1) {
  //     setCurrentStep(currentStep + 1);
  //   } else {
  //     calculateDepressionLevel();
  //   }
  // };

  // const prevStep = () => {
  //   if (currentStep > 0) {
  //     setVideoActive(false);
  //     setCurrentStep(currentStep - 1);
  //   }
  // };

  // const calculateDepressionLevel = () => {
  //   const depressionLevel = Object.keys(expressions).reduce(
  //     (acc, expr) => acc + expressions[expr],
  //     0
  //   );
  //   let level = "NO_DEPRESSION";

  //   if (depressionLevel > 0.6) {
  //     level = "SEVERE_DEPRESSION";
  //   } else if (depressionLevel > 0.4) {
  //     level = "MODERATE_DEPRESSION";
  //   } else if (depressionLevel > 0.2) {
  //     level = "MILD_DEPRESSION";
  //   }

  //   alert(`Depression Level: ${level}`);
  // };

  return (
    //   <section
    //   id="diagnostic"
    //   className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    // >

    <div className="w-full lg:w-2/3 mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg">
      <ol className="space-y-4">
        {questions.map((question, index) => (
          <li key={index}>
            <QuestionStep
              key={index}
              question={question.question}
              description={question.description}
              answers={question.answers}
              index={index}
            />
          </li>
        ))}
      </ol>
    </div>

    // </section>
  );
}
