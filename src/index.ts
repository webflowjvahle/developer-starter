import * as THREE from 'three';
import { TextureLoader } from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

window.Webflow ||= [];
window.Webflow.push(() => {
  // console.log('hello');
  init3D();
});

let flow;
let currentXtranslate = 0;
let currentYtranslate = 0;
// let currentZtranslate = 0;

const break1 = 992;
const break2 = 768;
const break3 = 480;

function getXshift() {
  if (window.innerWidth < break3) {
    return 17;
  }
  if (window.innerWidth < break2) {
    return 0;
  }
  if (window.innerWidth < break1) {
    return -1;
  }
  return 0;
}

function getYshift() {
  if (window.innerWidth < break3) {
    return 3;
  }
  if (window.innerWidth < break2) {
    return 10;
  }
  if (window.innerWidth < break1) {
    return 6;
  }
  return 0;
}

function getZshift() {
  if (window.innerWidth < break3) {
    return 0.2;
  }
  if (window.innerWidth < break2) {
    return 0.4;
  }
  if (window.innerWidth < break1) {
    return 0.5;
  }
  return 0;
}

function getzoomshift() {
  if (window.innerWidth < break3) {
    return 0.5;
  }
  if (window.innerWidth < break2) {
    return 0.6;
  }
  if (window.innerWidth < break1) {
    return 0.7;
  }
  return 1;
}

let rectLight1;
let rectLight2;
let rectLight3;
let rectLight4;
let lightOneAngle = 0;
let currentTime = 0;

const bumpTexture = new THREE.TextureLoader().load(
  'https://1.bp.blogspot.com/-RkeeOAt_YJY/V2HQdu89ntI/AAAAAAAARGc/1EbHUE27Wn4mQxilNqejG8V8gxntjOpnACLcB/s1600/seamles_white_plaster_stucco_texture.jpg-displacement.jpg'
);

const normalTexture = new THREE.TextureLoader().load(
  'https://4.bp.blogspot.com/-DL92QdixUF4/V2HRM8FfR6I/AAAAAAAARG4/d8ahgms0HqIt__XAekz-R7uf4Ig1rnvwQCLcB/s1600/seamles_white_plaster_stucco_texture.jpg-normal.jpg'
);

const texturefile = new THREE.TextureLoader().load(
  'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/6463925c61d09e9e0d0a1415_VASPnet-MainTextureV4.png'
);

// Init Function
function init3D() {
  // select container
  const viewport = document.querySelector('[data-3d="c"]');
  // console.log(viewport);

  // create scened and renderer and camera
  const scene = new THREE.Scene();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, 1, -1, 0.1, 1000);

  camera.zoom = 0.04; // Zoom out to make models appear smaller
  camera.updateProjectionMatrix(); // Must call after changing properties of the camera

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  // renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);
  viewport.appendChild(renderer.domElement);

  window.addEventListener(
    'resize',
    function (event) {
      if (flow == undefined) {
        return;
      }

      flow.translateX(-currentXtranslate);
      currentXtranslate = getXshift();
      flow.translateX(currentXtranslate);

      flow.translateY(-currentYtranslate);
      currentYtranslate = getYshift();
      flow.translateY(currentYtranslate);

      // flow.translateZ(-currentZtranslate);
      // currentZtranslate = getzoomshift();
      // flow.translateZ(currentZtranslate);

      flow.scale.set(getzoomshift(), getzoomshift(), getzoomshift());

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      console.log('resizetwo');
      renderer.render(scene, camera);
    },
    true
  );

  camera.position.set(220, 5, 30);

  // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  // scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xefefff, 1);
  dirLight.position.set(10, 10, 10);
  scene.add(dirLight);

  RectAreaLightUniformsLib.init();

  rectLight1 = new THREE.RectAreaLight(0xffffff, 2, 14, 14);
  rectLight1.position.set(220, 30, -40);
  rectLight1.lookAt(0, 0, 32);
  scene.add(rectLight1);

  rectLight2 = new THREE.RectAreaLight(0xffffff, 0.5, 12, 12);
  rectLight2.position.set(90, -5, 1);
  rectLight2.lookAt(0, 0, 32);
  scene.add(rectLight2);

  rectLight3 = new THREE.RectAreaLight(0xffffff, 0.4, 8, 8);
  rectLight3.position.set(116, -8, 4);
  rectLight3.lookAt(0, 0, 32);
  scene.add(rectLight3);

  rectLight4 = new THREE.RectAreaLight(0xffffff, 0.3, 8, 8);
  rectLight4.position.set(98, 12, 5);
  rectLight4.lookAt(0, 0, 32);
  scene.add(rectLight4);

  // const rectLightHelper1 = new RectAreaLightHelper(rectLight1);
  // const rectLightHelper2 = new RectAreaLightHelper(rectLight2);
  // const rectLightHelper3 = new RectAreaLightHelper(rectLight3);
  // const rectLightHelper4 = new RectAreaLightHelper(rectLight4);
  // rectLight1.add(rectLightHelper1);
  // rectLight2.add(rectLightHelper2);
  // rectLight3.add(rectLightHelper3);
  // rectLight4.add(rectLightHelper4);

  // Add controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // animation setup
  const clock = new THREE.Clock();
  let mixer = null;

  function animate() {
    const delta = clock.getDelta();
    currentTime += delta;
    requestAnimationFrame(animate);
    if (mixer !== null) {
      mixer.update(delta);
    }
    controls.update();
    const totalRunTime = 5.416666507720947;
    const totalTime = 5.416666507720947;
    const circumference = 2 * Math.PI;
    const speed = circumference / totalTime;
    const distance = speed * delta;

    const radius = 40;
    const xoffset = 0;
    const zoffset = 0;

    if (currentTime < totalTime) {
      lightOneAngle += distance;

      rectLight1.position.x = xoffset + radius * Math.sin(lightOneAngle);
      rectLight1.position.z = zoffset + radius * Math.cos(lightOneAngle);
      rectLight1.lookAt(0, 0, 22);

      rectLight2.position.x = xoffset + radius * Math.sin(lightOneAngle);
      rectLight2.position.z = zoffset + radius * Math.cos(lightOneAngle);
      rectLight2.lookAt(0, 0, 22);

      rectLight3.position.x = xoffset + radius * Math.sin(lightOneAngle);
      rectLight3.position.z = zoffset + radius * Math.cos(lightOneAngle);
      rectLight3.lookAt(0, 0, 22);

      rectLight4.position.x = xoffset + radius * Math.sin(lightOneAngle);
      rectLight4.position.z = zoffset + radius * Math.cos(lightOneAngle);
      rectLight4.lookAt(0, 0, 22);
    }
    if (currentTime > totalRunTime) {
      currentTime = 0;
    }
    renderer.render(scene, camera);
  }

  animate();

  // --- load 3d async
  const assets = load();
  assets.then((data) => {
    flow = data.flow.scene;
    const { animations } = data.flow;

    const { texture } = data;

    const newMaterial = new THREE.MeshStandardMaterial({
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      metalness: 0,
      roughness: 0.5,
      map: texturefile,
    });

    // newMaterial.normalMap = normalTexture;
    newMaterial.bumpMap = bumpTexture;
    newMaterial.bumpScale = 0.1;

    flow.traverse((node) => {
      // if (node.isMesh) {
      // const helper = new VertexNormalsHelper(node, 1, 0xff0000);
      // scene.add(helper);
      node.material = newMaterial;
      node.material.needsUpdate = true;
      // console.log(node.material);
      console.log('textureChange');
      // }
    });

    // scene.traverse((child) => {
    //   if (child.material) child.material.metalness = 0;
    // });

    // Position the model
    flow.rotateY(180);
    flow.translateY(-16);
    flow.translateZ(32);

    flow.translateX(-currentXtranslate);
    currentXtranslate = getXshift();
    flow.translateX(currentXtranslate);

    flow.scale.set(getzoomshift(), getzoomshift(), getzoomshift());
    flow.translateY(-currentYtranslate);
    currentYtranslate = getYshift();
    flow.translateY(currentYtranslate);

    // flow.translateZ(-currentZtranslate);
    // currentZtranslate = getzoomshift();
    // flow.translateZ(currentZtranslate);
    controls.update();
    const modelPosition = flow.position;
    camera.lookAt(modelPosition);

    // console.log(animations);
    // console.log(flow.visible);

    // Add axes to the scene
    // const axesHelper = new THREE.AxesHelper(6); // Size of the axes
    // scene.add(axesHelper);

    // initialize mixer after flow is loaded
    mixer = new THREE.AnimationMixer(flow);
    animations.forEach((animation) => {
      const action = mixer.clipAction(animation);
      action.play();
    });

    scene.add(flow);
  });
}

/* Loader Functions */
async function load() {
  const flow = await loadModel(
    'https://dl.dropbox.com/s/zcz2m4d5t36isuw/VASPnet-HomePage-HeroSection-3D%20Symbol%20Flowing%20Animation.-V8.glb'
  );

  // const texture = await loadTexture(
  //   'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/6463925c61d09e9e0d0a1415_VASPnet-MainTextureV4.png'
  // );

  return { flow };
}

// const textureLoader = new TextureLoader();
const modelLoader = new GLTFLoader();

// function loadTexture(url) {
//   return new Promise((resolve) => {
//     textureLoader.load(url, resolve, (data) => {
//       data.needsUpdate = true;
//       data.flipY = false;

//       resolve(data);
//     });
//   });
// }

function loadModel(url, id) {
  return new Promise((resolve, reject) => {
    modelLoader.load(url, (gltf) => {
      console.log(gltf);
      const { scene } = gltf;
      const { animations } = gltf;
      resolve({ scene, animations });
    });
  });
}
/* const modelLoader = new GLTFLoader();

function loadModel(url, id) {
  return new Promise((resolve, reject) => {
    modelLoader.load(url, (gltf) => {
      const result = gltf.scene;

      result.traverse((node) => {
        if (node.isMesh) {
          // Create a new material with the desired color
          const newMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            metalness: 1,
            roughness: 0.5,
          });
          // Assign the new material to the mesh
          node.material = newMaterial;
        }
      });

      resolve(result);
    });
  });
} */

// -----------------> VASPdata 3D model <-----------------

/* window.Webflow ||= [];
window.Webflow.push(() => {
  // console.log('hello');
  init3D();
});

// Init Function
function init3D() {
  // select container
  const viewport = document.querySelector('[data-3d="c"]');
  // console.log(viewport);

  // create scened and renderer and camera
  const scene = new THREE.Scene();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, 1, -1, 0.1, 1000);

  camera.lookAt(scene.position);

  camera.zoom = 0.3825; // Zoom out to make models appear smaller
  camera.updateProjectionMatrix(); // Must call after changing properties of the camera

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  viewport.appendChild(renderer.domElement);

  camera.position.set(0, 0, 1);

  console.log(camera.position);

  // Add lights

  const pointLight1 = new THREE.PointLight(0xd2e39e, 0.8);
  const pointLight2 = new THREE.PointLight(0x924abc, 0.3);

  pointLight1.position.set(0.6, 0.5, 1);
  pointLight1.distance = 8;
  scene.add(pointLight1);

  pointLight2.position.set(3.2, -0.5, 1);
  pointLight2.distance = 5;
  scene.add(pointLight2);

  // const sphereSize = 1;
  // const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, sphereSize);
  // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize);
  // scene.add(pointLightHelper1);
  // scene.add(pointLightHelper2);

  // const geometry = new THREE.SphereGeometry(5, 32, 32);
  // const material = new THREE.MeshPhysicalMaterial({
  //   clearcoat: 1.0,
  //   clearcoatRoughness: 0.1,
  //   metalness: 0.9,
  //   roughness: 0.5,
  //   color: 0x0000ff,
  // });
  // const sphere = new THREE.Mesh(geometry, material);
  // scene.add(sphere);

  // Add controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // Listen for the 'change' event of OrbitControls
  controls.addEventListener('change', () => {
    const cameraPosition = camera.position;
    console.log('Camera position:', cameraPosition);
  });

  // animation setup
  const clock = new THREE.Clock();
  let mixer = null;

  function animate() {
    requestAnimationFrame(animate);
    if (mixer !== null) {
      mixer.update(clock.getDelta());
    }
    controls.update();

    renderer.render(scene, camera);
  }

  animate();

  // --- load 3d async
  const assets = load();
  assets.then((data) => {
    const flow = data.flow.scene;
    const { animations } = data.flow;

    const { texture } = data;

    const newMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe7e7e7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    flow.traverse((node) => {
      if (node.isMesh && node.material.isMeshPhysicalMaterial) {
        node.material = newMaterial;
        node.material.needsUpdate = true;
        console.log(node.material);
      }
    });

    // Position the model
    flow.translateY(-1);
    flow.translateX(2.3);

    const modelPosition = flow.position;
    camera.lookAt(modelPosition);

    // console.log(animations);
    // console.log(flow.visible);

    // Add axes to the scene
    // const axesHelper = new THREE.AxesHelper(6); // Size of the axes
    // scene.add(axesHelper);

    // initialize mixer after flow is loaded
    mixer = new THREE.AnimationMixer(flow);
    animations.forEach((animation) => {
      const action = mixer.clipAction(animation);
      action.play();
    });

    scene.add(flow);
  });
}
// Loader Functions
async function load() {
  const flow = await loadModel(
    'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/646cc8740256b27c439474a6_XReg-VASPdata-MainViusalsV2.glb.txt'
  );

  // const texture = await loadTexture(
  //   'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/6463925c61d09e9e0d0a1415_VASPnet-MainTextureV4.png'
  // );

  return { flow };
}

/* // const textureLoader = new TextureLoader();
const modelLoader = new GLTFLoader();

// function loadTexture(url) {
//   return new Promise((resolve) => {
//     textureLoader.load(url, resolve, (data) => {
//       data.needsUpdate = true;
//       data.flipY = false;

//       resolve(data);
//     });
//   });
// }

function loadModel(url, id) {
  return new Promise((resolve, reject) => {
    modelLoader.load(url, (gltf) => {
      console.log(gltf);
      const { scene } = gltf;
      const { animations } = gltf;
      resolve({ scene, animations });
    });
  });
}
 const modelLoader = new GLTFLoader();

function loadModel(url, id) {
  return new Promise((resolve, reject) => {
    modelLoader.load(url, (gltf) => {
      const result = gltf.scene;

      result.traverse((node) => {
        if (node.isMesh) {
          // Create a new material with the desired color
          const newMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            metalness: 1,
            roughness: 0.5,
          });
          // Assign the new material to the mesh
          node.material = newMaterial;
        }
      });

      resolve(result);
    });
  });
}*/

// -----------------> VASPindex 3D model <-----------------

/* window.Webflow ||= [];
window.Webflow.push(() => {
  // console.log('hello');
  init3D();
});

let flow;
let currentZtranllate = 0;

function setCanvasDimensions(canvas, width, height, set2dTransform = false) {
  // const ratio = window.devicePixelRatio;
  const ratio = 1;
  console.log('width ' + width + ' height ' + height);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  // canvas.style.width = `${width}px`;
  // canvas.style.height = `${height}px`;
  if (set2dTransform) {
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
  }
}

const break1 = 767;
const break2 = 479;

function getzshift() {
  if (window.innerWidth < break2) {
    return -5;
  }
  if (window.innerWidth < break1) {
    return -2.5;
  }
  return 0;
}

function getzoomshift() {
  if (window.innerWidth < break2) {
    return 0.25;
  }
  if (window.innerWidth < break1) {
    return 0.5;
  }
  return 1;
}

// Init Function
function init3D() {
  // select container
  const viewport = document.querySelector('[data-3d="c"]');
  // console.log(viewport);

  // create scened and renderer and camera
  const scene = new THREE.Scene();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  viewport.appendChild(renderer.domElement);

  window.addEventListener(
    'resize',
    function (event) {
      // flow.position.x = 2.85;
      // flow.matrixWorld.identity();
      // flow.updateMatrix();
      // flow.position.z = 0.001;
      flow.translateZ(-currentZtranllate);
      currentZtranllate = getzshift();
      flow.translateZ(currentZtranllate);
      // flow.rotateY(20);
      // flow.translateY(-1.85);
      // flow.translateX(2.85 + getxshift());
      // flow.scale.set(1.7 * getzoomshift(), 1.7 * getzoomshift(), 1.7 * getzoomshift());
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.updateProjectionMatrix();
      console.log('resizetwo');
      // setCanvasDimensions(renderer.domElement, window.innerWidth, window.innerHeight);
      // renderer.render(scene, camera);
    },
    true
  );

  // function handleWindowResize() {
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }
  // window.addEventListener('resize', handleWindowResize, false);

  camera.position.set(4.75, 1, 1);

  console.log(camera.position);

  // Add lights

  const pointLight1 = new THREE.PointLight(0x924abc, 0.09);
  const pointLight2 = new THREE.PointLight(0x924abc, 0.1);
  const pointLight3 = new THREE.PointLight(0xb4bcc6, 0.8);
  const pointLight4 = new THREE.PointLight(0xfffefa, 0.1);

  pointLight1.position.set(0.5, -1, 0.5);
  pointLight1.distance = 2;
  pointLight1.decay = 20;
  scene.add(pointLight1);

  pointLight2.position.set(0.5, -1.2, 0.5);
  pointLight2.distance = 30;
  scene.add(pointLight2);

  pointLight3.position.set(0, 2, 0);
  pointLight3.distance = 200;
  scene.add(pointLight3);

  pointLight4.position.set(0.5, -2.2, -1);
  pointLight4.distance = 10;
  scene.add(pointLight4);

  // const sphereSize = 1;
  // const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, sphereSize);
  // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize);
  // const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, sphereSize);
  // const pointLightHelper4 = new THREE.PointLightHelper(pointLight4, sphereSize);
  // scene.add(pointLightHelper1);
  // scene.add(pointLightHelper2);
  // scene.add(pointLightHelper3);
  // scene.add(pointLightHelper4);

  // const geometry = new THREE.SphereGeometry(5, 32, 32);
  // const material = new THREE.MeshPhysicalMaterial({
  //   clearcoat: 1.0,
  //   clearcoatRoughness: 0.1,
  //   metalness: 0.9,
  //   roughness: 0.5,
  //   color: 0x0000ff,
  // });
  // const sphere = new THREE.Mesh(geometry, material);
  // scene.add(sphere);

  // Add controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // Listen for the 'change' event of OrbitControls
  controls.addEventListener('change', () => {
    const cameraPosition = camera.position;
    console.log('Camera position:', cameraPosition);
  });

  // animation setup
  const clock = new THREE.Clock();
  let mixer = null;

  function animate() {
    requestAnimationFrame(animate);
    if (mixer !== null) {
      mixer.update(clock.getDelta());
    }
    controls.update();

    renderer.render(scene, camera);
  }

  animate();

  // --- load 3d async
  const assets = load();
  assets.then((data) => {
    flow = data.flow.scene;
    const { animations } = data.flow;

    const { texture } = data;

    const newMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe7e7e7,
    });

    flow.traverse((node) => {
      if (node.isMesh && node.material.isMeshPhysicalMaterial) {
        node.material = newMaterial;
        node.material.needsUpdate = true;
        console.log(node.material);
      }
    });

    // Position the model
    flow.rotateY(20);
    flow.translateY(-1.85);
    flow.translateX(2.85);
    flow.scale.set(1.7 * getzoomshift(), 1.7 * getzoomshift(), 1.7 * getzoomshift());

    const modelPosition = flow.position;
    camera.lookAt(modelPosition);

    // console.log(animations);
    // console.log(flow.visible);

    // Add axes to the scene
    const axesHelper = new THREE.AxesHelper(6); // Size of the axes
    scene.add(axesHelper);

    // initialize mixer after flow is loaded
    mixer = new THREE.AnimationMixer(flow);
    animations.forEach((animation) => {
      const action = mixer.clipAction(animation);
      action.play();
    });

    scene.add(flow);
  });
}

Loader Functions
async function load() {
  const flow = await loadModel(
    'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/646cc881753d19347906fbac_XReg-VASPindex-MainViusalsV2.glb.txt'
  );

  // const texture = await loadTexture(
  //   'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/6463925c61d09e9e0d0a1415_VASPnet-MainTextureV4.png'
  // );

  return { flow };
}

// const textureLoader = new TextureLoader();
const modelLoader = new GLTFLoader();

// function loadTexture(url) {
//   return new Promise((resolve) => {
//     textureLoader.load(url, resolve, (data) => {
//       data.needsUpdate = true;
//       data.flipY = false;

//       resolve(data);
//     });
//   });
// }

function loadModel(url, id) {
  return new Promise((resolve, reject) => {
    modelLoader.load(url, (gltf) => {
      console.log(gltf);
      const { scene } = gltf;
      const { animations } = gltf;
      resolve({ scene, animations });
    });
  });
}

/* const modelLoader = new GLTFLoader();

function loadModel(url, id) {
  return new Promise((resolve, reject) => {
    modelLoader.load(url, (gltf) => {
      const result = gltf.scene;

      result.traverse((node) => {
        if (node.isMesh) {
          // Create a new material with the desired color
          const newMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            metalness: 1,
            roughness: 0.5,
          });
          // Assign the new material to the mesh
          node.material = newMaterial;
        }
      });

      resolve(result);
    });
  });
}

// -----------------> VASPindex 3D model RESTRUCTURED <-----------------
/*window.Webflow ||= [];
window.Webflow.push(() => {
  // console.log('hello');
  init3D();
});

const break1 = 767;
const break2 = 479;

let scene, camera, renderer, cube, model;

function getxshift() {
  if (window.innerWidth < break1) {
    return 0.5;
  }

  if (window.innerWidth < break2) {
    return 0.25;
  }
  return 0;
}

function getzoomshift() {
  if (window.innerWidth < break1) {
    return 0.5;
  }

  if (window.innerWidth < break2) {
    return 0.25;
  }
  return 1;
}

function init3D() {
  // select container
  const viewport = document.querySelector('[data-3d="c"]');
  console.log(viewport);

  scene = new THREE.Scene();
  const aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  viewport.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const loader = new GLTFLoader();

  model = loader.load(
    'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/646cc881753d19347906fbac_XReg-VASPindex-MainViusalsV2.glb.txt',
    function (gltf) {
      model = gltf.scene;

      model.rotateY(20);
      model.translateY(0);
      model.translateX(0);
      model.scale.set(1, 1, 1);

      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  scene.position.x = 0;

  camera.position.set(10, 1.5, 2);
  controls.update();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add lights

  const pointLight1 = new THREE.PointLight(0x924abc, 0.09);
  const pointLight2 = new THREE.PointLight(0x924abc, 0.1);
  const pointLight3 = new THREE.PointLight(0xb4bcc6, 0.8);
  const pointLight4 = new THREE.PointLight(0xfffefa, 0.1);

  pointLight1.position.set(0.5, -1, 0.5);
  pointLight1.distance = 2;
  pointLight1.decay = 20;
  scene.add(pointLight1);

  pointLight2.position.set(0.5, -1.2, 0.5);
  pointLight2.distance = 30;
  scene.add(pointLight2);

  pointLight3.position.set(0, 2, 0);
  pointLight3.distance = 200;
  scene.add(pointLight3);

  pointLight4.position.set(0.5, -2.2, -1);
  pointLight4.distance = 10;
  scene.add(pointLight4);

  const sphereSize = 1;
  const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, sphereSize);
  const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize);
  const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, sphereSize);
  const pointLightHelper4 = new THREE.PointLightHelper(pointLight4, sphereSize);
  scene.add(pointLightHelper1);
  scene.add(pointLightHelper2);
  scene.add(pointLightHelper3);
  scene.add(pointLightHelper4);

  // Add axes to the scene
  const axesHelper = new THREE.AxesHelper(6); // Size of the axes
  scene.add(axesHelper);

  // Listen for window resize event
  window.addEventListener('resize', onWindowResize);

  animate();
}

function onWindowResize() {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scale the model based on window width and height
  const scaleValue = Math.min(window.innerWidth / 900, window.innerHeight / 900);

  cube.scale.set(scaleValue, scaleValue, scaleValue);
  model.scale.set(scaleValue, scaleValue, scaleValue);

  // Render the scene
  renderer(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();
}

function render() {
  renderer.render(scene, camera);
}
*/
