import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

let containerDrone;
let camera;
let renderer;
let scene;
let drone;
let modalBody;

function init(){
    containerDrone = document.querySelector('.dronesection');
    modalBody = document.querySelector('.modal-body');

    // Scene 
    scene = new THREE.Scene();

    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 500;
    // Camera Settings 
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0, 1,3);

    // Lights
    const ambient = new THREE.AmbientLight(0x404040, 100);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(10,10,10);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 10);
    light.position.set(20,20,20);
    scene.add(light2);

    //Renderer Settings
    renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
    renderer.setSize(500,500);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerDrone.append(renderer.domElement);




    //load model objects
    let loader = new GLTFLoader();
    loader.load('/model/drone.gltf', function (gltf){
        scene.add(gltf.scene);
        drone = gltf.scene; 
        animateDrone();
    })
}


function animateDrone(){
    requestAnimationFrame(animateDrone);
    renderer.render(scene,camera);
    drone.rotation.y += 0.002;
}

function onWindowResize(){
    const canvas = document.querySelector("canvas"); 
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

init();
onWindowResize();