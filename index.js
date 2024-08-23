const readline = require('readline');
const fal = require("@fal-ai/serverless-client");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question and return the answer as a promise
function askQuestion(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function generateCover() {
    try {
        const scene = await askQuestion('Describe the scene in one word: ');
        const colorTone = await askQuestion('Pick a color tone (e.g., warm, cool, vibrant, pastel): ');
        const genre = await askQuestion('Pick a genre (e.g., rock, jazz, pop, classical): ');

        rl.close();

        // Construct the prompt for the AI model
        const prompt = `a playlist cover with ${scene} scene, ${colorTone}color tone and , ${genre} genre. add the instruments related to the ${genre}`;

        // Generate the image using the Fal AI service
        const result = await fal.subscribe("fal-ai/flux/dev", {
            input: {
                prompt: prompt
            },
            logs: false // Disable detailed log output
        });

        // Check if result contains the image URL
        if (result && result.images && result.images.length > 0) {
            console.log('Image URL:', result.images[0].url);
        } else {
            console.error('Image URL not found in result.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

generateCover();
