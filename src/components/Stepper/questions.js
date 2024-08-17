// const questions = [

//     {
//         id: 0,
//         text: "Init Camer",
//         options: [
//           { id: 11, label: "Yes, a little", facialExpression: "Slightly sad", voiceTone: "Slightly low" },
//           { id: 12, label: "Yes, noticeably", facialExpression: "Clearly sad", voiceTone: "Frustrated" },
//           { id: 13, label: "Yes, a lot", facialExpression: "Very depressed", voiceTone: "Very low" },
//         ],
//       },


//     {
//       id: 1,
//       text: "Do you feel sad or depressed most of the time?",
//       options: [
//         { id: 11, label: "Yes, a little", facialExpression: "Slightly sad", voiceTone: "Slightly low" },
//         { id: 12, label: "Yes, noticeably", facialExpression: "Clearly sad", voiceTone: "Frustrated" },
//         { id: 13, label: "Yes, a lot", facialExpression: "Very depressed", voiceTone: "Very low" },
//       ],
//     },
//     {
//       id: 2,
//       text: "Do you find it difficult to enjoy activities that you used to enjoy?",
//       options: [
//         { id: 21, label: "Yes, a little", facialExpression: "Bored", voiceTone: "Frustrated" },
//         { id: 22, label: "Yes, noticeably", facialExpression: "Clearly disinterested", voiceTone: "Sad" },
//         { id: 23, label: "Yes, a lot", facialExpression: "Completely indifferent", voiceTone: "Very low" },
//       ],
//     },
//     {
//       id: 3,
//       text: "Do you feel tired or low on energy most days?",
//       options: [
//         { id: 31, label: "Yes, a little", facialExpression: "Slightly tired", voiceTone: "Slightly low" },
//         { id: 32, label: "Yes, noticeably", facialExpression: "Clearly tired", voiceTone: "Frustrated" },
//         { id: 33, label: "Yes, a lot", facialExpression: "Very tired", voiceTone: "Very low" },
//       ],
//     },
//     {
//       id: 4,
//       text: "Do you have persistent thoughts of death or suicide?",
//       options: [
//         { id: 41, label: "No, just occasional thoughts", facialExpression: "Anxious", voiceTone: "Calm" },
//         { id: 42, label: "Yes, sometimes", facialExpression: "Sad", voiceTone: "Frustrated" },
//         { id: 43, label: "Yes, a lot", facialExpression: "Very depressed", voiceTone: "Very low" },
//       ],
//     },
//     {
//       id: 5,
//       text: "Do you find it very difficult to do simple everyday tasks?",
//       options: [
//         { id: 51, label: "Yes, a little", facialExpression: "Slightly nervous", voiceTone: "A little low" },
//         { id: 52, label: "Yes, noticeably", facialExpression: "Tired", voiceTone: "Calm" },
//         { id: 53, label: "Yes, a lot", facialExpression: "Very tired", voiceTone: "Very low" },
//       ],
//     },
//   ];


//   export default questions;


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

  export default questions;