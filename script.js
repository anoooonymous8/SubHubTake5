const tasks = ["I just need a player 2 for my games so that's gonna be u i decided", "Ur gonna be my footrest, bitch boy", "I'll be leashing him up and walking him in public", "Im sick of men and ur bs so ur gonna be my literal punching bag", "I need some stress relief after my shift so ur gonna be my punching bag", "I need some stress relief from all this coursework so ur gonna be my punching bag", "i dont know where my ex moved to so im gonna beat ur ass instead", "Hey loser, ur gonna be a sex slave for a party with the girlies!", "I will hide him under the cushions then invite my girl friends over", "Hey beta boy, im bouta have the wildest sex party ever with some real men and u get 2 clean up after!", "I make feminist content online. Ur going to play the men and say exactly what i tell u.", "Cuck. You'll be sat outside the door in chastity", "Cuck. U get to watch but im still putting u in chastity", "Ur getting cucked, but well let u watch and even touch urself ;)", "Come watch me fuck my gf!", "I deserve a foot massage. A long one", "Ur going to lick my pussy until i tell u to stop.", "Congrats! U get to be my sex slave for the day. (I'm hypersexual btw)", "Im going on a hot date tonight w a real man. Ill let u rate my outfits tho", "Imma fuck your mouth with my 8 inch girldick", "Imma pound ur ass with my 8 inch girldick", "I am a fetishist and I intend to put you through extreme pain while I touch myself."];

const names = ["Jessica", "Ashley", "Emily", "Sarah", "Samantha", "Amanda", "Brittany", "Elizabeth", "Taylor", "Megan", "Hannah", "Kayla", "Lauren", "Stephanie", "Rachel", "Jennifer", "Nicole", "Alexis", "Victoria", "Amber", "Alyssa", "Courtney", "Rebecca", "Danielle", "Jasmine", "Brianna", "Katherine", "Alexandra", "Madison", "Morgan", "Melissa", "Michelle", "Kelsey", "Chelsea", "Anna", "Kimberly", "Tiffany", "Olivia", "Mary", "Christina", "Allison", "Abigail", "Sara", "Shelby", "Heather", "Haley", "Maria", "Kaitlyn", "Laura", "Erin", "Andrea", "Natalie", "Jordan"];

async function showRandomImage() {
    try {
        // Fetch the automatically generated list
        const response = await fetch('images.json');
        const imageFiles = await response.json();
        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        
        // Change all the displays
        document.getElementById("randomImage").src = "selfies/" + imageFiles[randomIndex];

        document.getElementById("randomImage").style.display = "block";
        document.getElementById("randomName").style.display = "block";
        document.getElementById("randomTask").style.display = "block";
        document.getElementById("sendMe").style.display = "block";

        document.getElementById("pastSessions").style.display = "none";
        document.getElementById("subNow").style.display = "none";
        
        document.querySelector(".website-container").style.backgroundImage = "url('app-pics/background.png')";
    } catch (error) {
        console.error("Could not load image list:", error);
    }
}

document.getElementById("pastSessions").addEventListener("click", function() {
    window.location.href = "https://www.redquill.net/collection/7ci2bj-subhub---past-sessions";
});

document.getElementById("sendMe").addEventListener("click", function() {
    window.location.href = "https://www.redquill.net/story-idea/4j5oem";
});

document.getElementById("subNow").addEventListener("click", function() {
    showRandomImage();
    //get random name
    const randomIndex = Math.floor(Math.random() * names.length);
    document.getElementById("randomName").textContent = names[randomIndex];
    //get random task
    const randomTaskIndex = Math.floor(Math.random() * tasks.length);
    document.getElementById("randomTask").textContent = tasks[randomTaskIndex];
});

document.addEventListener('click', () => {
    document.documentElement.requestFullscreen();
});


function scaleContainer() {
  const container = document.querySelector('.website-container');
  const designWidth = 1080;
  const designHeight = 2340;

  // Calculate scale based on current window size
  const scaleX = window.innerWidth / designWidth;
  const scaleY = window.innerHeight / designHeight;
  
  // Pick the smaller scale so the entire container fits without clipping
  const scale = Math.min(scaleX, scaleY);

  container.style.transform = `scale(${scale})`;
}

// Run on load and on window resize
window.addEventListener('resize', scaleContainer);
window.addEventListener('DOMContentLoaded', scaleContainer);