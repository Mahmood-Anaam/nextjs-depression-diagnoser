'use client'

import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import SpeechRecognition, {
    useSpeechRecognition
} from 'react-speech-recognition'

const Page = () => {

  const [message, setMessage] = useState('None data')
  const commands = [
    {
      command: 'Yes*',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]



  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(null) // null or boolean

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    // sets to true or false after component has been mounted
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition) 
  }, [browserSupportsSpeechRecognition])

  if (speechRecognitionSupported === null) return null // return null on first render, can be a loading indicator

  if (!speechRecognitionSupported) {
    return <span>Browser does not support speech recognition.</span>
  }

  return (
    <div>
      <div>
      <p>{message}</p>
      <p>{transcript}</p>
    </div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={()=>SpeechRecognition.startListening( {continuous: true})}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
     
      <p>{transcript}</p>
    </div>
  )
}

export default Page