"use client";
import "regenerator-runtime/runtime";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function QuestionStep({
  question,
  description,
  answers,
  index = 0,
}) {
  const [currentStep, setCurrentStep] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoActive, setVideoActive] = useState(false);
  const [videoDims, setVideoDims] = useState({ width: 0, height: 0 });

  function startVideo() {

    setVideoActive(true);

  };

  function stopVideo() {

    setVideoActive(false);
  };


  const handleUserMedia = (stream) => {
    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings();
    setVideoDims({ width: settings.width, height: settings.height });
  };



  // UI
  return (
    <>
      {/* div one */}
      <div
        className={`cursor-pointer p-4 rounded-lg border ${
          currentStep
            ? "bg-teal-500 text-white"
            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        }`}
        onClick={() => {
          setCurrentStep(!currentStep);
        }}
      >
        {/* question */}
        <div className="flex justify-between items-center">
          <span>
            {index}. {question}
          </span>
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${
              currentStep ? "rotate-180" : ""
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
          currentStep ? "max-h-full" : "max-h-0"
        }`}
      >
        {/* description */}
        {currentStep && (
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
                      setSelectedAnswer(i);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${
                      selectedAnswer === i
                        ? "bg-primary text-white"
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
                  controls={true}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{facingMode: "user"}}
                  onUserMedia={handleUserMedia}
                  className="opacity-60 w-full rounded mx-auto"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute"
                />
              </div>

              <button
                onClick={videoActive ? stopVideo : startVideo}
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

            {/* Continue*/}
            <div className="mt-5 flex justify-center">
              <button
                className="px-6 py-2 bg-teal-500 text-white rounded-lg"
                // onClick={nextStep}
                disabled={currentStep}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
