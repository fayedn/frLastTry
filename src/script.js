import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'lil-gui'
import gsap from 'gsap'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;
camera.position.x = 0;
camera.position.y = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 0);
renderer.setSize(400, 400);
document.getElementById('scene-container').appendChild(renderer.domElement);

// GLTFLoader to load the model
const loader = new GLTFLoader();
let heartModel;

// Load a glTF resource
loader.load(
  'heart.glb', // Replace 'path/to/heart.glb' with the path to your model
  function (gltf) {
    // Called when the resource is loaded
    heartModel = gltf.scene;
    scene.add(heartModel);
  },
  undefined,
  function (error) {
    // Called when load fails
    console.error(error);
  }
);

// Lights
// Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040, 4);
scene.add(ambientLight);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 4, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(0, 1, 0);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 4);
directionalLight2.position.set(5, 0, 4);
scene.add(directionalLight2)
scene.add(directionalLight);

// Spotlight
const spotLight = new THREE.SpotLight(0xffffff, 4);
spotLight.position.set(0, 10, 0);
scene.add(spotLight);

// Mouse movement
const mouse = new THREE.Vector2();
let isMouseMoving = false;

function onMouseMove(event) {
  // Convert mouse position to normalized device coordinates (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  isMouseMoving = true;
}

window.addEventListener('mousemove', onMouseMove, false);

let lastTime = Date.now();
function animate() {
    requestAnimationFrame(animate);

    // Calculate elapsed time
    let currentTime = Date.now();
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    if (heartModel) {
      if (isMouseMoving) {
        // Point the heart towards the mouse
        heartModel.lookAt(mouse.x, mouse.y, 2);
        isMouseMoving = false; // Reset flag
      } else {
        // Spin heart when mouse is not moving
        heartModel.rotation.y += 0.020
      }
    }

    renderer.render(scene, camera);
}

animate();