"use client";

import { useState } from 'react';

const questions = [
  {
    text: "How do you feel today?",
    instructions: "Please describe your feelings today. Try to express any emotions you're experiencing.",
    suggestedAnswers: ["I feel good", "I feel sad", "I'm anxious"]
  },
  {
    text: "Have you lost interest in daily activities?",
    instructions: "Tell us if you have lost interest in your regular activities or hobbies.",
    suggestedAnswers: ["Yes, I have lost interest", "No, I'm still interested", "I'm not sure"]
  },
  {
    text: "Do you have trouble sleeping?",
    instructions: "Describe your recent sleeping patterns.",
    suggestedAnswers: ["I can't sleep", "I sleep too much", "I sleep normally"]
  },
  {
    text: "Are you experiencing fatigue?",
    instructions: "Share if you have been feeling unusually tired or exhausted.",
    suggestedAnswers: ["Yes, I feel very tired", "No, I feel normal", "Sometimes I feel tired"]
  },
  {
    text: "Do you feel hopeless?",
    instructions: "Express any feelings of hopelessness you may have.",
    suggestedAnswers: ["Yes, I feel hopeless", "No, I don't feel hopeless", "I'm not sure"]
  },
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
// dark => #202737
// light => #f8f9ff
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Depression Level Assessment</h2>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {questions.map((question, index) => (
          <li key={index} className={`mb-10 ml-6 ${currentStep === index ? 'bg-primary p-4 rounded-lg' : ''}`} style={currentStep === index ?{backgroundColor:"#202737"}:null}>
            <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 
              ${currentStep >= index ? 'bg-green-200' : 'bg-gray-100 dark:bg-gray-700'}`}>
              <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm-1 15L4 10.586 5.414 9.172 9 12.758 14.586 7.172 16 8.586l-7 7z"/>
              </svg>
            </span>
            <h3 className="font-medium leading-tight text-lg text-gray-900 dark:text-white mb-2">{question.text}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{question.instructions}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Suggested answers: {question.suggestedAnswers.join(", ")}</p>
            {currentStep === index && (
              <div className="mt-4">
                <div className="mb-4">
                  {/* Webcam component placeholder */}
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Webcam will appear here</p>
                  </div>
                </div>
                <button onClick={handleNext} className="mt-4 px-4 py-2 bg-primary text-white rounded shadow-md hover:bg-primary-dark">
                  Next
                </button>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stepper;









