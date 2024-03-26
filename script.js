document.addEventListener('DOMContentLoaded', function () {
  const trooperNames = ['Alpha', 'Beta', 'Gamma', 'Delta'];
  const commanderNames = ['Obi-Wan Kenobi', 'Yoda', 'Anakin Skywalker'];

  const trooperNameElement = document.getElementById('trooper-name');
  const commanderNameElement = document.getElementById('commander-name');
  const userImageElement = document.getElementById('user-image');
  const cameraContainer = document.getElementById('camera-container');
  const takePhotoButton = document.getElementById('take-photo');
  const trooperCard = document.getElementById('trooper-card');
  const cameraPreview = document.getElementById('camera-preview');

  // Function to select a random item from an array
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Function to update trooper card with random names and user image
  function updateTrooperCard() {
    const trooperName = getRandomItem(trooperNames);
    const commanderName = getRandomItem(commanderNames);

    trooperNameElement.textContent = trooperName;
    commanderNameElement.textContent = commanderName;

    trooperNameElement.style.display = 'block';
    commanderNameElement.style.display = 'block';
    userImageElement.style.display = 'block';
    trooperCard.style.display = 'flex';
    takePhotoButton.style.display = 'none';
  }

  // Function to take a photo
  function takePhoto() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;

    context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
    context.drawImage(document.querySelector('.overlay'), 0, 0, canvas.width, canvas.height); // Keep overlay

    const imageDataURL = canvas.toDataURL('image/png');
    userImageElement.src = imageDataURL;

    updateTrooperCard();
  }

  // Event listener for take photo button
  takePhotoButton.addEventListener('click', function () {
    cameraContainer.style.display = 'block';
    takePhoto();
  });

  // Access user camera (moved inside click event listener)
  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        cameraPreview.srcObject = stream;
      })
      .catch(function (error) {
        console.error('Error accessing camera:', error);
      });
  }

  // Hide camera and overlay initially
  cameraContainer.style.display = 'none';

  // Initialize camera when button is clicked
  takePhotoButton.addEventListener('click', function () {
    startCamera();
  });
});
