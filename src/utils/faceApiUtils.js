import * as faceapi from 'face-api.js';

let modelsLoaded = false;

async function loadFaceApiModels() {
  if (!modelsLoaded) {
    const MODEL_URL = '/models';
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    modelsLoaded = true;
  }
}

// Detect all faces in an image
export async function detectAllFaces(image) {
  await loadFaceApiModels();
  const img = await faceapi.fetchImage(image);
  return await faceapi.detectAllFaces(img);
}

// Detect a single face in an image
export async function detectSingleFace(image) {
  await loadFaceApiModels();
  const img = await faceapi.fetchImage(image);
  return await faceapi.detectSingleFace(img);
}

// Extract descriptors for all faces in an image
export async function extractAllFaceDescriptors(image) {
  await loadFaceApiModels();
  const img = await faceapi.fetchImage(image);
  const fullDesc = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
  return fullDesc.map(fd => fd.descriptor);
}

// Extract descriptor for a single face in an image
export async function extractSingleFaceDescriptor(image) {
  await loadFaceApiModels();
  const img = await faceapi.fetchImage(image);
  const fullDesc = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptors();
  return fullDesc ? fullDesc.descriptor : null;
}

// Detect all face expressions in an image
export async function detectAllFaceExpressions(image) {
  await loadFaceApiModels();
  const img = await faceapi.fetchImage(image);
  return await faceapi.detectAllFaces(img).withFaceExpressions();
}

// Detect a single face expression in an image
export async function detectSingleFaceExpression(image) {
  await loadFaceApiModels();
  const img = await faceapi.fetchImage(image);
  return await faceapi.detectSingleFace(img).withFaceExpressions();
}
