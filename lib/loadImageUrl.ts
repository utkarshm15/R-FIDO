//



import { loadImage } from './faceApi'; 

/**
 * Downloads an image from a given URL and loads it for Face-API.js processing.
 * @param {string} url The URL of the image to download.
 * @returns {Promise<any>} A promise that resolves with the loaded image, or rejects on error.
 */
export async function loadRemoteImage(url: string): Promise<any> {
  if (!url) {
    throw new Error('Image URL is not provided.');
  }

  try {
    // console.log("hello------------");
    
    const response = await fetch(url);
    // console.log("hii------------");
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    
    const arrayBuffer = await response.arrayBuffer();

    
    const buffer = Buffer.from(arrayBuffer);

    
    const img = await loadImage(buffer);

    return img;
  } catch (error) {
    console.error(`Error loading image from URL "${url}":`, error);
    throw error; 
  }
}