const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up MediaPipe to track your hand
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onResults);

// Set up Three.js for the PNG lightsaber
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Load the PNG as a sprite
const texture = new THREE.TextureLoader().load('lightsaber.png');
const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
const lightsaber = new THREE.Sprite(material);
lightsaber.scale.set(1, 3, 1); // Adjust size (width, height, depth)
scene.add(lightsaber);
camera.position.z = 5;

// Start the webcam
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.play();
}
startCamera();

// When MediaPipe sees your hand, move the lightsaber
function onResults(results) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (results.multiHandLandmarks) {
    const landmarks = results.multiHandLandmarks[0];
    const wrist = landmarks[0]; // Wrist point
    const index = landmarks[8]; // Index finger point

    // Move lightsaber to wrist
    lightsaber.position.set(
      (wrist.x * canvas.width / canvas.width - 0.5) * 10,
      -(wrist.y * canvas.height / canvas.height - 0.5) * 10,
      0
    );

    // Rotate lightsaber to follow hand
    const angle = Math.atan2(index.y - wrist.y, index.x - wrist.x);
    lightsaber.rotation.z = angle;
  }

  ctx.restore();
  renderer.render(scene, camera);
}

// Keep checking the webcam for hand movements
const cameraFeed = new Camera(video, {
  onFrame: async () => {
    await hands.send({ image: video });
  },
  width: 1280,
  height: 720,
});
cameraFeed.start();