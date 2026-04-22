import * as faceapi from 'face-api.js';
import * as canvas from 'canvas';;
import path from 'path';

const { Canvas, Image, ImageData, loadImage } = canvas
faceapi.env.monkeyPatch({ Canvas : Canvas as any, Image : Image as any, ImageData:ImageData as any  });

const MODEL_URL = path.join(process.cwd(), 'public/models');
let modelsLoadedPromise :Promise<void> | null = null;

export async function loadModels() {
  if (modelsLoadedPromise === null) {
    modelsLoadedPromise = (async () => {
      // console.log("Server: Loading Face-API models for the first time...");
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL),
      ]);
      // console.log("Server: Face-API models loaded!");
    })();
  }
  return modelsLoadedPromise;
}

export { faceapi,loadImage };