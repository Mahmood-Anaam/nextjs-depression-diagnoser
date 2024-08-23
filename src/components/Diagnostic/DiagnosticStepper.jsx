"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QuestionStep from "./QuestionStep";
import questions from "./questions";
import Dialog from "./Dialog";

export default function DiagnosticStepper() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [diagnosis, setDiagnosis] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const initialList = questions.map((q, i) => ({
    answer: null,
    expression: null,
  }));

  const [userAnswers, setUserAnswers] = useState(initialList);

  const handleFinsh = (indexQuestion) => {
    setCurrentIndex(-1);
    let totalScore = 0;

    userAnswers.forEach((answer) => {
      // Add points based on the user's answers
      if (answer.answer === "Rarely") totalScore += 1;
      if (answer.answer === "Sometimes") totalScore += 2;
      if (answer.answer === "Often") totalScore += 3;
    
      // Add points based on the user's expressions
      if (answer.expression === "neutral") totalScore += 1;
      if (answer.expression === "happy") totalScore += 0;
      if (answer.expression === "sad") totalScore += 2;
      if (answer.expression === "angry") totalScore += 2;
      if (answer.expression === "disgusted") totalScore += 2;
      if (answer.expression === "fearful") totalScore += 3;
      if (answer.expression === "surprised") totalScore += 1;
    });
    

    let diagnosis = "";
    let message = "";

    // Determine the final diagnosis and the corresponding message
    if (totalScore <= 5) {
      diagnosis = "Not Depressed";
      message =
        "Based on your responses, it appears that you are not currently experiencing symptoms of depression. Maintaining a healthy lifestyle and staying connected with loved ones is important.";
    } else if (totalScore <= 10) {
      diagnosis = "Mildly Depressed";
      message =
        "Our assessment suggests that you might be experiencing mild symptoms of depression. It’s essential to monitor your feelings and consider talking to a counselor or therapist.";
    } else if (totalScore <= 15) {
      diagnosis = "Moderately Depressed";
      message =
        "Your responses indicate that you may be experiencing moderate depression. It’s important to address these feelings before they become more severe. Seeking support from a mental health professional is recommended.";
    } else {
      diagnosis = "Severely Depressed";
      message =
        "Our evaluation indicates that you are likely experiencing severe symptoms of depression. This is a critical time to reach out for help. We urge you to contact a mental health professional immediately.";
    }

    // Show the diagnosis in the dialog
    setDiagnosis({ diagnosis, message });
    setShowDialog(true);
  };

  const handleSelectedAnswer = (indexQuestion, indexAnswer) => {
    const newuserAnswers = [...userAnswers];
    const Q = newuserAnswers[indexQuestion - 1];
    Q.answer = questions[indexQuestion - 1].answers[indexAnswer];
    setUserAnswers(newuserAnswers);
  };

  const handleExpression = (indexQuestion, label) => {
    const newuserAnswers = [...userAnswers];
    const Q = newuserAnswers[indexQuestion - 1];
    Q.expression = label;
    setUserAnswers(newuserAnswers);
  };

  const handleContinue = (indexQuestion) => {
    setCurrentIndex(indexQuestion);
  };

  const handleClose = (indexQuestion) => {
    setCurrentIndex(-1);
  };

  const handleOpen = (indexQuestion) => {
    setCurrentIndex(indexQuestion - 1);
  };

  return (
    <>
      <div className="w-full lg:w-2/3 mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg">
        <ol className="space-y-4">
          {questions.map((question, index) => (
            <li key={index}>
              <QuestionStep
                question={question.question}
                description={question.description}
                answers={question.answers}
                index={index + 1}
                isCurrentStep={currentIndex == index}
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

      {showDialog && (
        <Dialog
          diagnosis={diagnosis.diagnosis}
          message={diagnosis.message}
          onClose={() => setShowDialog(false)}
          onConsult={() => {
            router.replace("/booking");
            router.refresh();
          }}
        />
      )}
    </>
  );
}
