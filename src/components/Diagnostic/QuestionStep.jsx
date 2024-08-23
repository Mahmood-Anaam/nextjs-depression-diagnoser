"use client";
import "regenerator-runtime/runtime";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { detectSingleFaceExpression } from "@/utils/faceApiUtils";
import * as faceapi from "face-api.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function QuestionStep({
  question,
  description,
  answers,
  index = null,
  isCurrentStep = false,
  onSelectedAnswer = null,
  onExpression = null,
  onContinue = null,
  isFinsh = false,
  onFinsh = null,
  onOpen = null,
  onClose = null,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoActive, setVideoActive] = useState(false);
  const [expression, setExpression] = useState(null);
  const intervalIdRef = useRef(null);






  // Define voice commands based on the answers
  const commands = answers.map((answer, index) => ({
    command: [answer.toLowerCase()],
    callback: (cmd) => {
      console.log(`Recognized command: ${cmd}`);
      handleSelectedAnswer(index);
    },
  }));

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });


  const handleStartAnswer = () => {
    setVideoActive(true);
  };

  const handleStopAnswer = () => {
    setVideoActive(false);
  };

  const capture = async () => {
    if (webcamRef.current && canvasRef.current && videoActive) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const detection = await detectSingleFaceExpression(imageSrc);

        if (detection) {
          const displaySize = {
            width: webcamRef.current.video.videoWidth,
            height: webcamRef.current.video.videoHeight,
          };

          const canvas = canvasRef.current;
          faceapi.matchDimensions(canvas, displaySize);
          const resizedDetection = faceapi.resizeResults(
            detection,
            displaySize
          );
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetection);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetection);

          const label = detection.expressions.asSortedArray()[0].expression;
          if (label != expression) {
            setExpression(label);
            if (onExpression) {
              onExpression(index, label);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (videoActive && isCurrentStep) {
      intervalIdRef.current = setInterval(capture, 100);
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      SpeechRecognition.stopListening();
      resetTranscript();
    }

    return () => clearInterval(intervalIdRef.current);
  }, [videoActive, isCurrentStep]);

  const handleContinue = () => {
    resetTranscript();
    if (onContinue) {
      onContinue(index);
    }
  };

  const handleSelectedAnswer = (indexAnswer) => {
    setSelectedAnswer(indexAnswer);
    if (onSelectedAnswer) {
      onSelectedAnswer(index, indexAnswer);
    }
  };

  const handleFinsh = () => {
    if (onFinsh) {
      onFinsh(index);
    }
  };

  const handleOpen = () => {
    resetTranscript();
    if (onOpen) {
      onOpen(index);
    }
  };

  const handleClose = () => {
    resetTranscript();
    if (onClose) {
      onClose(index);
    }
  };


  // UI

  return (
    <>
      {/* div one */}
      <div
        className={`cursor-pointer p-4 rounded-lg border ${
          isCurrentStep
            ? "bg-blue-950 text-white"
            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        }`}
        onClick={() => {
          isCurrentStep ? handleClose() : handleOpen();
        }}
      >
   
        {/* question */}
        <div className="flex justify-between items-center">
          <span>
            {index}. {question}
          </span>
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isCurrentStep ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* div tow */}

      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isCurrentStep ? "max-h-full" : "max-h-0"
        }`}
      >
        {/* description */}
        {isCurrentStep && (
          <div className="p-4 border-l border-b border-r border-gray-200 dark:border-gray-700 rounded-b-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {description}
            </p>

            {/* answers */}
            <ul className="space-y-2">
              {answers.map((answer, i) => (
                <li key={i}>
                  <div
                    onClick={() => {
                      handleSelectedAnswer(i);
                    }}
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

            {/* Webcam */}
            <div className="container mt-5 mx-auto flex flex-col ">
              <div className="relative w-full">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                  className="opacity-60 w-full rounded mx-auto"
                />
                <canvas
                  ref={canvasRef}
                  className={`absolute w-full rounded mx-auto top-0 left-0 ${
                    videoActive ? "" : "hidden"
                  } `}
                />
              </div>

              <button
                onClick={videoActive ? handleStopAnswer : handleStartAnswer}
                className={`mt-4 w-full lg:w-auto px-6 py-3 rounded-lg text-lg font-medium tracking-wide transition-all duration-300 ${
                  videoActive
                    ? "bg-red-500 text-white"
                    : "bg-primary text-white"
                } flex items-center justify-center`}
              >
                {videoActive ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Stop Answer
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.867v4.266a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 5.5H5a2.5 2.5 0 00-2.5 2.5v8a2.5 2.5 0 002.5 2.5h14a2.5 2.5 0 002.5-2.5v-8a2.5 2.5 0 00-2.5-2.5z"
                      />
                    </svg>
                    Start Answer
                  </>
                )}
              </button>
            </div>

            {/* Continue/Finsh*/}
            <div className="mt-5 flex justify-center">
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg  hover:bg-blue-900 transition"
                onClick={isFinsh ? handleFinsh : handleContinue}
              >
                {isFinsh ? "Finsh" : "Continue"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
