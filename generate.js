const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'selfies');

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }
    
    // Filter out non-image files if necessary
    const images = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    // Save to a json file
    fs.writeFileSync('images.json', JSON.stringify(images, null, 2));
    console.log(`Successfully generated images.json with ${images.length} images!`);
});