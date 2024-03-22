const cameraFeed = document.getElementById('cameraFeed');
const takePhotoButton = document.getElementById('takePhoto');

// Access the camera and stream video feed
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        cameraFeed.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing camera:', error);
    });

// Handle taking photo
takePhotoButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video dimensions
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;

    // Draw the current frame of the video onto the canvas
    context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);

    // Extract the photo data from the canvas as a data URL
    const photoDataUrl = canvas.toDataURL('image/png');

    // Display the captured photo on the trooper card
    const trooperImage = document.getElementById('trooperImage');
    trooperImage.src = photoDataUrl;

    // Generate random trooper name and commander name
    const trooperName = generateRandomTrooperName();
    const commanderName = generateRandomCommanderName();

    // Update trooper name and commander name on the card
    document.getElementById('trooperName').innerText = trooperName;
    document.getElementById('commanderName').innerText = commanderName;
});

function generateRandomTrooperName() {
    const trooperNames = ['Shadow', 'Raven', 'Blaze', 'Viper', 'Spike', 'Thunder', 'Falcon', 'Steel', 'Ghost', 'Scorpion'];
    return trooperNames[Math.floor(Math.random() * trooperNames.length)];
}

function generateRandomCommanderName() {
    const commanderNames = ['Obi-Wan Kenobi', 'Yoda', 'Anakin Skywalker', 'Mace Windu', 'Luke Skywalker', 'Leia Organa', 'Ahsoka Tano'];
    return commanderNames[Math.floor(Math.random() * commanderNames.length)];
}
