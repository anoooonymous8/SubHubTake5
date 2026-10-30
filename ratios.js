const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Specify the folder path containing your images
const FOLDER_PATH = './selfies'; 

// Supported image extensions
const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.avif']);

async function listImagesByRatio(folderPath) {
  try {
    // 1. Read files from directory
    const files = await fs.promises.readdir(folderPath);

    // Filter out non-image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return VALID_EXTENSIONS.has(ext);
    });

    if (imageFiles.length === 0) {
      console.log('No valid images found in the directory.');
      return;
    }

    // Map to store ratio -> array of filenames
    const ratioMap = {};

    console.log(`Processing ${imageFiles.length} images...\n`);

    // 2. Process images in parallel using Sharp
    await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(folderPath, file);
        try {
          const metadata = await sharp(filePath).metadata();
          
          if (metadata.width && metadata.height) {
            // Calculate height / width ratio
            const rawRatio = metadata.height / metadata.width;
            
            // Round to 2 decimal places
            const roundedRatio = (Math.round(rawRatio * 100) / 100).toFixed(2);

            // Initialize array if it doesn't exist and push filename
            if (!ratioMap[roundedRatio]) {
              ratioMap[roundedRatio] = [];
            }
            ratioMap[roundedRatio].push(file);
          }
        } catch (err) {
          console.warn(`Could not read metadata for file: ${file}`);
        }
      })
    );

    // 3. Sort ratios numerically (ascending: smallest to largest)
    const sortedRatios = Object.keys(ratioMap).sort((a, b) => parseFloat(a) - parseFloat(b));

    // 4. Output results grouped by ratio
    console.log('=== Images Grouped by H/W Ratio (Smallest to Largest) ===\n');

    sortedRatios.forEach(ratio => {
      const fileList = ratioMap[ratio];
      // Sort filenames alphabetically inside each ratio group for extra neatness
      fileList.sort();

      console.log(`Ratio: ${ratio} (Total: ${fileList.length})`);
      fileList.forEach(file => {
        console.log(`  - ${file}`);
      });
      console.log(''); // Blank line separator
    });

  } catch (err) {
    console.error('Error reading directory:', err.message);
  }
}

// Run script
listImagesByRatio(FOLDER_PATH);