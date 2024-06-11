"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
function Scene1({ texture, texture_type }) {
  // console.log("agya ",texture)
  let setup;
  const textureLoader = new TextureLoader();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // const axis = new THREE.AxesHelper(20);
  // scene.add(axis);

  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // const grid = new THREE.GridHelper();
  // scene.add(grid);

  const pointLight = new THREE.PointLight("white");
  pointLight.power = 3500;
  scene.add(pointLight);
  pointLight.position.set(3, 10, 0);
  const pointLightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(pointLightHelper);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  );
  dracoLoader.setDecoderConfig({ type: "js" });
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  // const loader = new GLTFLoader();

  loader.load("/final_room7.glb", (gltf) => {
    const model = gltf.scene;
    setup = model;
    console.log("pp", setup);
    scene.add(setup);
    setup.position.set(0, 1, 0);
    // setup.scale.set(0.1, 0.1, 0.1);
    // setup.children[9].material.map = textureLoader.load("/404.webp");
    // setup.children[9].material.map = textureLoader.load("https://m.media-amazon.com/images/I/61AHiYyu3ZL._SL1500_.jpg");
    if (texture_type == "Flooring") {
      setup.children[9].material.map = textureLoader.load(texture);
      setup.children[16].material.map = textureLoader.load(
        "/images/textures/tex_curtain.jpg"
      );
    } else if (texture_type == "Wallpaper") {
      setup.children[8].material.map = textureLoader.load(texture);
      setup.children[9].material.map = textureLoader.load(
        "/images/textures/tex_floor.jpg"
      );
      setup.children[16].material.map = textureLoader.load(
        "/images/textures/tex_curtain.jpg"
      );
    } else if (texture_type == "Curtains") {
      setup.children[16].material.map = textureLoader.load(texture);
      setup.children[9].material.map = textureLoader.load(
        "/images/textures/tex_floor.jpg"
      );
    } else if (texture_type == "Blinds") {
      setup.children[15].material.map = textureLoader.load(texture);
      setup.children[9].material.map = textureLoader.load(
        "/images/textures/tex_floor.jpg"
      );
      setup.children[16].material.map = textureLoader.load(
        "/images/textures/tex_curtain.jpg"
      );
    }
    // setup.children[10].children[0].children[0].children[0].material.map =
    //   textureLoader.load(texture);
  });

  // useEffect(()=>{
  //   document.getElementById("canvas").appendChild(renderer.domElement);
  // },[])

  function animate() {
    // if(setup){
    //   setup.rotation.y+=.01
    // }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  if (texture_type == "Flooring") {
    camera.position.set(9, 5, 5);
    camera.lookAt(0, 0, 0);
  } else if (texture_type == "Wallpaper") {
    camera.position.set(5, 4, 0);
    camera.lookAt(0, 4, 0);
  } else if (texture_type == "Curtains") {
    camera.position.set(0, 4, 2);
    camera.lookAt(0, 4, 0);
  } else if (texture_type == "Blinds") {
    camera.position.set(3, 5.5, -7);
    camera.lookAt(3, 5.5, -8);
  }

  // const [count, setCount] = useState(0);
  // const handleClick = () => {
  //   setCount(1); // Update the state to trigger re-render
  // };

  // setTimeout(() => {
  //   // console.log("pop")
  //   handleClick();
  // }, 2000);

  // const [src, setSrc] = useState("");
  setTimeout(() => {
    const imgData = renderer.domElement.toDataURL("image/png", 1);
    // console.log(imgData);
    // setSrc(imgData);
    localStorage.setItem("scene1img", imgData);
  }, 3000);

  return (
    <div>
      {/* <input
        onChange={handleSliderChange}
        type="range"
        value={val}
      /> */}
      {/* <img id="" src={src} alt="ffff" /> */}

      {/* <div id="canvas"></div> */}
    </div>
  );
}

export default Scene1;
