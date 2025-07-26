// This script downloads the accreditation logo images from Imgur to local storage
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure images directory exists
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Images to download
const images = [
  { url: 'https://i.imgur.com/2sfH5oz.png', filename: 'vignan-logo.png' },
  { url: 'https://i.imgur.com/5c9iY3a.png', filename: 'naac-logo.png' },
  { url: 'https://i.imgur.com/k2j425V.png', filename: 'nba-logo.png' },
  { url: 'https://i.imgur.com/S33r5mX.png', filename: 'ugc-logo.png' },
  { url: 'https://i.imgur.com/rOHn6jP.png', filename: 'nirf-logo.png' },
];

// Download function using fetch API to handle redirects properly
const downloadImage = async (url, filename) => {
  const filePath = path.join(imagesDir, filename);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${filename} already exists, skipping download`);
    return;
  }
  
  console.log(`Downloading ${url} to ${filename}...`);
  
  try {
    // Use fetch API which handles redirects automatically
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to download ${url}: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`✓ Downloaded ${filename}`);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
    // If file was created but incomplete, remove it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

// Download all images
Promise.all(images.map(img => downloadImage(img.url, img.filename)))
  .then(() => console.log('All images downloaded successfully!'))
  .catch(err => console.error('Error downloading images:', err));
