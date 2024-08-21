"use client";
import "regenerator-runtime/runtime";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const questions = [
  {
    question: "Do you often feel sad or depressed?",
    description:
      "This question aims to understand your general emotional state over a period of time.",
    answers: ["Yes, a little", "Yes, noticeably", "Yes, a lot"],
  },
  {
    question: "Do you find it difficult to enjoy activities you used to enjoy?",
    description:
      "This question helps assess changes in your interest or pleasure in activities.",
    answers: ["Yes, a little", "Yes, noticeably", "Yes, a lot"],
  },
  {
    question: "Do you often feel tired or low in energy most days?",
    description:
      "This question looks at your energy levels and how fatigue might affect your daily life.",
    answers: ["Yes, a little", "Yes, noticeably", "Yes, a lot"],
  },
  {
    question: "Do you have frequent thoughts about death or suicide?",
    description:
      "This question is crucial in understanding the severity of your depressive symptoms.",
    answers: ["No, just occasional thoughts", "Yes, sometimes", "Yes, often"],
  },
  {
    question: "Do you find it difficult to carry out simple daily tasks?",
    description:
      "This question evaluates how your depression might be impacting your daily functionality.",
    answers: ["Yes, a little", "Yes, noticeably", "Yes, a lot"],
  },
];

export default function DiagnosticStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoActive, setVideoActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [expressions, setExpressions] = useState({});
  const [transcript, setTranscript] = useState("");

  const commands = questions[currentStep].answers.map((answer, index) => ({
    command: answer.toLowerCase(),
    callback: () => {
      setSelectedAnswer(index);
      handleAnswerSelection(answer);
    },
  }));

  const { resetTranscript } = useSpeechRecognition({ commands });

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };
    loadModels();
  }, []);

  useEffect(() => {
    let animationFrameId;
    if (videoActive) {
      detectFace();
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
      clearCanvas();
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
    resetTranscript();
    clearCanvas();
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  const detectFace = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const detection = await faceapi
        .detectSingleFace(video)
        .withFaceExpressions();

      if (detection) {
        setExpressions(detection.expressions);

        const canvas = canvasRef.current;
        const displaySize = {
          // width: 1280,
          // height: 720
          width: video.videoWidth,
          height: video.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);

        const resizedDetection = faceapi.resizeResults(detection, displaySize);
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetection);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetection);
      }
    }

    if (videoActive) {
      requestAnimationFrame(detectFace);
    }
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    stopVideo();
    nextStep();
  };

  const nextStep = () => {
    setVideoActive(false);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateDepressionLevel();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setVideoActive(false);
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateDepressionLevel = () => {
    const depressionLevel = Object.keys(expressions).reduce(
      (acc, expr) => acc + expressions[expr],
      0
    );
    let level = "NO_DEPRESSION";

    if (depressionLevel > 0.6) {
      level = "SEVERE_DEPRESSION";
    } else if (depressionLevel > 0.4) {
      level = "MODERATE_DEPRESSION";
    } else if (depressionLevel > 0.2) {
      level = "MILD_DEPRESSION";
    }

    alert(`Depression Level: ${level}`);
  };

  return (
    <div className="w-full lg:w-2/3 mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg">
      <ol className="space-y-4">
        {questions.map((question, index) => (
          <li key={index}>
            <div
              className={`cursor-pointer p-4 rounded-lg border ${
                currentStep === index
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
              onClick={() => {
                setVideoActive(false);
                setCurrentStep(index);
              }}
            >
              <div className="flex justify-between items-center">
                <span>
                  {index + 1}. {question.question}
                </span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    currentStep === index ? "rotate-180" : ""
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
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                currentStep === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              {currentStep === index && (
                <div className="p-4 border-l border-b border-r border-gray-200 dark:border-gray-700 rounded-b-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {question.description}
                  </p>
                  <ul className="space-y-2">
                    {question.answers.map((answer, i) => (
                      <li key={i}>
                        <div
                          onClick={() => {
                            setSelectedAnswer(i);
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

                  <div className={`mt-6 ${videoActive ? "" : "opacity-60"}`}>
                    <div className="relative w-full h-72 md:h-96 bg-gray-300 rounded-lg flex items-center justify-center dark:bg-gray-700">
                      <Webcam
                        key={index}
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
                        key={index}
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  </div>

                  <button
                    key={index}
                    onClick={videoActive ? stopVideo : startVideo}
                    className={`mt-4 w-full lg:w-auto px-6 py-3 rounded-lg text-lg font-medium tracking-wide transition-all duration-300 ${
                      videoActive
                        ? "bg-red-500 text-white"
                        : "bg-teal-500 text-white"
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
                        Stop Video
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
                        Start Video
                      </>
                    )}
                  </button>

                  <div className="mt-6 flex justify-between">
                    <button
                      key={index}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-300"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </button>
                    <button
                      key={index}
                      className="px-6 py-2 bg-teal-500 text-white rounded-lg"
                      onClick={nextStep}
                      disabled={currentStep === questions.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
