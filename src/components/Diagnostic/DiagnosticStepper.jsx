"use client";
import React, { useState } from "react";
import QuestionStep from "./QuestionStep";
import questions from "./questions";
import useFaceApi from "./useFaceApi";

export default function DiagnosticStepper() {

  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const modelsLoaded = useFaceApi();

  const handleAnswer = (answer, expressions) => {
    
    const updatedResponses = [...responses];
    updatedResponses[currentStep] = { answer, expressions };
    setResponses(updatedResponses);
  };

  const handleStepClick = (index) => {
    setCurrentStep(index === currentStep ? -1 : index);
  };

  const calculateDepressionLevel = () => {
    let score = 0;

    responses.forEach((response) => {
      if (response.expressions.neutral > 0.6) {
        score += 1;
      } else if (response.expressions.sad > 0.5) {
        score += 2;
      } else if (response.expressions.angry > 0.5) {
        score += 3;
      }

      if (response.answer.includes("a lot")) {
        score += 3;
      } else if (response.answer.includes("noticeably")) {
        score += 2;
      } else if (response.answer.includes("a little")) {
        score += 1;
      }
    });

    if (score <= 5) return "NO_DEPRESSION";
    if (score <= 10) return "MILD_DEPRESSION";
    if (score <= 15) return "MODERATE_DEPRESSION";
    return "SEVERE_DEPRESSION";
  };

  if (!modelsLoaded) {
    return <div>Loading models...</div>;
  }

  return (
    <div className="w-full lg:w-2/3 mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 lg:p-6 rounded-lg shadow-lg">
      <ol className="space-y-4">
        {questions.map((question, index) => (
          <li key={index}>
            <div
              className={`cursor-pointer p-4 rounded-lg border ${currentStep === index ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="flex justify-between items-center">
                <span>{index + 1}. {question.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${currentStep === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${currentStep === index ? 'max-h-screen' : 'max-h-0'}`}
            >
              {currentStep === index && (
                <QuestionStep 
                  question={question.question} 
                  description={question.description} 
                  answers={question.answers} 
                  onNextStep={() => setCurrentStep(currentStep + 1)}
                  onAnswer={handleAnswer}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
      {currentStep === questions.length && (
        <div className="mt-8 text-center">
          <p className="text-xl font-bold">Your Depression Level:</p>
          <p className="text-2xl mt-2">{calculateDepressionLevel()}</p>
        </div>
      )}
    </div>
  );
}
