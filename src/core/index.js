// import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import constants from '../config/constants';

import Shape from './meshes/Shape';
import AnimateShape from './animations/AnimateShape';

/**
 * @class: Core
 * The Core class acts as the core of the threejs environment. It is in this
 * class that the scene, renderer, camera, controls and lights are all configured
 */
class Core {
    constructor() {
            this.stats = new Stats();
            this.scene = new THREE.Scene();
            this.renderer = this.configureRenderer();
            this.camera = this.configureCamera();
            if (constants.developMode) this.controls = this.configureControls();

            this.init();
            this.animate(0);
    }

    /**
     * @function: configureRenderer
     * @returns: {Object}: renderer
     * sets up and configures the renderer object to be used in the
     * environment.
     */
    configureRenderer() {
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        return renderer;
    }

    /**
     * @function: configureCamera
     * @returns: {Object}: camera
     * sets up and configures the camera object to be used in the
     * environment.
     */
    configureCamera() {
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(-3070, 3400, 1165);
        camera.lookAt(new THREE.Vector3());
        camera.updateProjectionMatrix();

        return camera;
    }

    /**
     * @function: configureControls
     * @returns: {Object}: controls
     * sets up and configures the developer control object to be used 
     * in the environment.
     */
    configureControls() {
        const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.panningMode = THREE.HorizontalPanning;
        controls.minDistance = 40.0;
        controls.maxDistance = 20000.0;
        return controls;

    }

    /**
     * @function: onWindowResize
     * Is triggered by a window resize which will adjust the camera and
     * renderer size and ration for responsive rendering.
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * @function: init
     * Initialises the environment. All the pieces of the scene are put
     * together in this function.
     */
    init() {
        /** direct the renderer and UI elements to the container element */
        const container = document.getElementById('container');
        container.appendChild(this.renderer.domElement);
        container.appendChild(this.stats.dom);
        // console.log(this.controls.target)
        // this.camera.lookAt(this.controls.target);


        /** Set up lights to be used in the scene */
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(300, 300, 300)
        light.castShadow = true;
        // light.shadow.mapSize.width = 1024;
        // light.shadow.mapSize.height = 1024;
        // light.shadow.camera.near = 0.5;
        // light.shadow.camera.far = 900;
        // light.shadow.camera.left = -400;
        // light.shadow.camera.right = 400;
        // light.shadow.camera.top = 400;
        // light.shadow.camera.bottom = -400;

        // const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
        // this.scene.add(shadowHelper)

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0a420d, 0.4 );
        hemiLight.position.y = 50;
        // var helper = new THREE.HemisphereLightHelper( hemiLight, 5, 0x000000);
        // this.scene.add( helper );

     

        /** Add all lights, meshes and shaders to the scene */
        this.scene.add(light);
        this.scene.add(hemiLight);

        /** Add event listeners for screen resizing */
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        // window.addEventListener('mouseup', () => { console.log("Camera Position: ", this.camera.position) }, false);
    }


    /**
     * @function: animate
     * @param {Number} timestamp: Used to measure the progress of time, a frame counter
     * Used to call upon the render function continuously so a new frame can be drawn
     * allowing for animation
     */
    animate(timestamp) {
        timestamp++
        this.renderer.setAnimationLoop(this.animate.bind(this, timestamp));
        TWEEN.update();
        // console.log("timestamp", timestamp)

        // every 1000
        if (timestamp % 100 === 0) {
            // console.log("adding shape at frame: ", timestamp)
            this.scene.add(Shape.generateShape(this.scene));
        }
        
        if (constants.developMode) this.controls.update();
        this.render(timestamp);

        // this.camera.position.set(-275 + this.character.position.x, 275 + this.character.position.y,250 + this.character.position.z);
        // this.camera.lookAt(this.character.position);

    }

    /**
     * @function: render
     * @param {Number} timestamp: Used to measure the progress of time, a frame counter
     * Draws an image to the screen including any pogressive changes. Uses the
     * threejs/WebGL renderer to draw an image
     */
    render(timestamp) {
        /** FPS counter */
        this.stats.update();

        /** Render the scene */
        this.renderer.render(this.scene, this.camera);
    }
}

export default Core;
