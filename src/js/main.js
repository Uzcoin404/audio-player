import * as THREE from "https://cdn.skypack.dev/three@0.136";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js";

let camera, scene, renderer, light1, light2, light3, light4, stats;

const clock = new THREE.Clock();

camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.z = 60;
camera.position.y = 10;

scene = new THREE.Scene();
// scene.scale.set(2,2,2)
//model

let loader = new GLTFLoader();
let object;
loader.load("src/glb.glb", (gltf) => {
    object = gltf.scene;
    scene.add(object);
    object.scale.set(30, 30, 30);
    object.position.set(0, -16.7, 3);
});

let sun = new THREE.DirectionalLight(0xffffff, 1);
scene.add(sun);

let sphere;

light1 = new THREE.PointLight(0xff0040, 5, 50);
light1.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 }))
);
scene.add(light1);

light2 = new THREE.PointLight(0x0040ff, 2, 50);
light2.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff }))
);
scene.add(light2);

light3 = new THREE.PointLight(0x80ff80, 2, 50);
light3.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x80ff80 }))
);
scene.add(light3);

light4 = new THREE.PointLight(0xffaa00, 2, 50);
light4.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 }))
);
scene.add(light4);

//renderer

let ratio = 1;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
renderer.domElement.classList.add("webgl");
//stats

// stats = new Stats();
// document.body.appendChild( stats.dom );

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

let mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
    // Update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Make the sphere follow the mouse
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.05);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z - 10;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    light1.position.copy(pos);
    // light2.position.copy(pos);
    // light3.position.copy(pos);
    // light4.position.copy(pos);

    // Make the sphere follow the mouse
    // drone.position.set(event.clientX, event.clientY, 0);
}

function render() {
    requestAnimationFrame(render);
    const time = Date.now() * 0.0005;
    const delta = clock.getDelta();

    object.rotation.y += 0.01;

    // light1.position.x = Math.sin( time * 0.7 ) * 30;
    // light1.position.y = Math.cos( time * 0.5 ) * 40;
    // light1.position.z = Math.cos( time * 0.3 ) * 30;

    light2.position.x = Math.cos(time * 0.3) * 30;
    light2.position.y = Math.sin(time * 0.5) * 40;
    light2.position.z = Math.sin(time * 0.7) * 30;

    light3.position.x = Math.sin(time * 0.7) * 30;
    light3.position.y = Math.cos(time * 0.3) * 40;
    light3.position.z = Math.sin(time * 0.5) * 30;

    light4.position.x = Math.sin(time * 0.3) * 30;
    light4.position.y = Math.cos(time * 0.7) * 40;
    light4.position.z = Math.sin(time * 0.5) * 30;

    renderer.render(scene, camera);
}
render();
