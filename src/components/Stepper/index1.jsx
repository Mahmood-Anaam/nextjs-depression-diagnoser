"use client"; 

import React, { useState } from "react";

const questions = [
  {
    question: "Do you often feel sad or depressed?",
    answers: [
      "Yes, a little",
      "Yes, noticeably",
      "Yes, a lot",
    ],
  },
  {
    question: "Do you find it difficult to enjoy activities you used to enjoy?",
    answers: [
      "Yes, a little",
      "Yes, noticeably",
      "Yes, a lot",
    ],
  },
  {
    question: "Do you often feel tired or low in energy most days?",
    answers: [
      "Yes, a little",
      "Yes, noticeably",
      "Yes, a lot",
    ],
  },
  {
    question: "Do you have frequent thoughts about death or suicide?",
    answers: [
      "No, just occasional thoughts",
      "Yes, sometimes",
      "Yes, often",
    ],
  },
  {
    question: "Do you find it difficult to carry out simple daily tasks?",
    answers: [
      "Yes, a little",
      "Yes, noticeably",
      "Yes, a lot",
    ],
  },
];

export default function DiagnosticStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [videoActive, setVideoActive] = useState(false);
  const [animate, setAnimate] = useState(false);

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setAnimate(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setAnimate(false);
        setVideoActive(false);
      }, 1000); // مطابقة التأخير مع مدة الحركة
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setAnimate(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setAnimate(false);
      }, 1000); // مطابقة التأخير مع مدة الحركة
    }
  };

  const handleAnswerSelection = (answer) => {
    setResponses({ ...responses, [currentStep]: answer });
  };

  const toggleVideo = () => {
    setVideoActive(!videoActive);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg">
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {questions.map((question, index) => (
          <li key={index} className="mb-10 ml-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 ${
                currentStep === index
                  ? "bg-teal-500 text-white"
                  : currentStep > index
                  ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-400"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              } rounded-full -left-4 ring-4 ring-white dark:ring-gray-900`}
            >
              {index + 1}
            </span>
            <h3 className={`font-medium leading-tight ${currentStep === index ? "text-teal-500" : "text-gray-500 dark:text-gray-400"}`}>
              {question.question}
            </h3>
            {currentStep === index && (
              <div
                className={`mt-4 transition-transform duration-1000 ease-in-out transform ${
                  animate ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                }`}
              >
                <div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
                  <ul className="mb-4">
                    {question.answers.map((answer, i) => (
                      <li
                        key={i}
                        onClick={() => handleAnswerSelection(answer)}
                        className={`cursor-pointer p-2 rounded-lg transition-colors duration-1000 ${
                          responses[currentStep] === answer
                            ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-400"
                            : "hover:bg-teal-50 dark:hover:bg-teal-700"
                        }`}
                      >
                        {answer}
                      </li>
                    ))}
                  </ul>

                  <div className={`w-full mb-4 ${videoActive ? "" : "opacity-60"}`}>
                    <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center dark:bg-gray-700 transition-opacity duration-1000 ease-in-out">
                      <p className="text-gray-500 dark:text-gray-300">[Live video feed here]</p>
                    </div>
                  </div>

                  <button
                    onClick={toggleVideo}
                    className={`w-full lg:w-auto px-6 py-3 rounded-lg text-lg font-medium tracking-wide transition-all duration-1000 ${
                      videoActive ? "bg-red-500 text-white" : "bg-teal-500 text-white"
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
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                </div>
                
                <div className="flex mt-4 gap-2">
                  {currentStep > 0 && (
                    <button
                      onClick={prevStep}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-300"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < questions.length - 1 && (
                    <button
                      onClick={nextStep}
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
