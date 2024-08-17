import { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function useFaceApi() {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      setModelsLoaded(true);
    };
    
    loadModels();
  }, []);

  return modelsLoaded;
}
