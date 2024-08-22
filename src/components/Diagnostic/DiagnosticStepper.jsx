"use client";
import React, { useState, useRef, useEffect } from "react";
import QuestionStep from "./QuestionStep";
import questions from "./questions";

export default function DiagnosticStepper() {

const [currentIndex,setCurrentIndex] = useState(-1)

  const initialList = questions.map((q, i) => ({
    answer: null,
    expression: null,
  }));

  const [userAnswers, setUserAnswers] = useState(initialList);

  const handleFinsh = (indexQuestion) => {};


  const handleSelectedAnswer = (indexQuestion, indexAnswer) => {
    const newuserAnswers = [...userAnswers];
    const Q = newuserAnswers[indexQuestion-1];
    Q.answer =questions[indexQuestion].answers[indexAnswer];
    setUserAnswers(newuserAnswers);

  };


  const handleExpression = (indexQuestion, label) => {
    const newuserAnswers = [...userAnswers];
    const Q = newuserAnswers[indexQuestion-1];
    Q.expression =label;
    setUserAnswers(newuserAnswers);

  };


  const handleContinue = (indexQuestion) => {
    setCurrentIndex(indexQuestion);

  };

  const handleClose = (indexQuestion) => {
    setCurrentIndex(-1);
    
  };

  const handleOpen = (indexQuestion) => {
    setCurrentIndex(indexQuestion-1);
    
  };


  return (

    <div className="w-full lg:w-2/3 mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg">
      <ol className="space-y-4">
        {questions.map((question, index) => (
          <li key={index}>
            <QuestionStep
              question={question.question}
              description={question.description}
              answers={question.answers}
              index={index + 1}
              isCurrentStep={currentIndex==index}
              isFinsh={index == questions.length - 1}
              onFinsh={index == questions.length - 1 ? handleFinsh : null}
              onSelectedAnswer={handleSelectedAnswer}
              onExpression={handleExpression}
              onContinue={handleContinue}
              onOpen={handleOpen}
              onClose={handleClose}

            />


          </li>
        ))}
      </ol>
    </div>
  );
}
