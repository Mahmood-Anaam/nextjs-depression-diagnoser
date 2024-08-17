"use client"; 

import React, { useState } from "react";

const questions = [
  {
    question: "Do you often feel sad or depressed?",
    description: "This question aims to understand your general emotional state over a period of time.",
    answers: [
      "Yes, a little",
      "Yes, noticeably",
      "Yes, a lot",
    ],
  },
  {
    question: "Do you find it difficult to enjoy activities you used to enjoy?",
    description: "This question helps assess changes in your interest or pleasure in activities.",
    answers: [
      "Yes, a little",
      "Yes, noticeably",
      "Yes, a lot",
    ],
  },
  {
    question: "Do you often feel tired or low in energy most days?",
    description: "This question looks at your energy levels and how fatigue might affect your daily life.",
    answers: [
      "Yes, a little",
      "Yes, noticeably",
      "Yes, a lot",
    ],
  },
  {
    question: "Do you have frequent thoughts about death or suicide?",
    description: "This question is crucial in understanding the severity of your depressive symptoms.",
    answers: [
      "No, just occasional thoughts",
      "Yes, sometimes",
      "Yes, often",
    ],
  },
  {
    question: "Do you find it difficult to carry out simple daily tasks?",
    description: "This question evaluates how your depression might be impacting your daily functionality.",
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

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerSelection = (answer) => {
    setResponses({ ...responses, [currentStep]: answer });
  };

  const toggleVideo = () => {
    setResponses(!responses);
  };

  return (
    <div className="flex flex-col w-full lg:w-[66vw] h-[80vh] mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg">
      <ol className="relative border-l border-gray-200 dark:border-gray-700 overflow-y-auto h-full">
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
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{question.description}</p>
            <div
              className={`mt-4 transition-max-height duration-500 ease-in-out overflow-hidden ${
                currentStep === index ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
                <ul className="mb-4">
                  {question.answers.map((answer, i) => (
                    <li
                      key={i}
                      onClick={() => handleAnswerSelection(answer)}
                      className={`cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
                        responses[currentStep] === answer
                          ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-400"
                          : "hover:bg-teal-50 dark:hover:bg-teal-700"
                      }`}
                    >
                      {answer}
                    </li>
                  ))}
                </ul>

                <div className={`w-full mb-4 ${responses ? "" : "opacity-60"}`}>
                  <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-300 rounded-lg flex items-center justify-center dark:bg-gray-700 transition-opacity duration-300 ease-in-out">
                    <p className="text-gray-500 dark:text-gray-300">[Live video feed here]</p>
                  </div>
                </div>

                <button
                  onClick={toggleVideo}
                  className={`w-full lg:w-auto px-6 py-3 rounded-lg text-lg font-medium tracking-wide transition-all duration-300 ${
                    responses ? "bg-red-500 text-white" : "bg-teal-500 text-white"
                  } flex items-center justify-center`}
                >
                  {responses ? (
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
          </li>
        ))}
      </ol>
    </div>
  );
}
