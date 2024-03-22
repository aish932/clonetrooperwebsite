document.addEventListener('DOMContentLoaded', function () {
  const trooperNames = ['Alpha', 'Beta', 'Gamma', 'Delta'];
  const commanderNames = ['Obi-Wan Kenobi', 'Yoda', 'Anakin Skywalker'];

  const trooperNameElement = document.getElementById('trooper-name');
  const commanderNameElement = document.getElementById('commander-name');
  const userImageElement = document.getElementById('user-image');
  const cameraPreview = document.getElementById('camera-preview');
  const takePhotoButton = document.getElementById('take-photo');

  // Function to select a random item from an array
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Function to update trooper card with random names
  function updateTrooperCard() {
    trooperNameElement.textContent = getRandomItem(trooperNames);
    commanderNameElement.textContent = getRandomItem(commanderNames);
  }

  // Function to take a photo
  function takePhoto() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;

    context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL('image/png');
    userImageElement.src = imageDataURL;
  }

  // Event listener for take photo button
  takePhotoButton.addEventListener('click', takePhoto);

  // Initialize trooper card
  updateTrooperCard();

  // Access user camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      cameraPreview.srcObject = stream;
    })
    .catch(function (error) {
      console.error('Error accessing camera:', error);
    });
});
