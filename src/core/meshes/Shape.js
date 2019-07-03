
import constants from '../../config/constants';
import helpers from '../../config/helpers';
import AnimateShape from '../animations/AnimateShape';

const Shape = {

  cube: (position, rotation) => {
    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = Shape.generateMat();
    const cube = new THREE.Mesh(cubeGeo, cubeMat);

    cube.position.set(position.x, position.y, position.z);
    cube.rotation.set(rotation.x, rotation.y, rotation.z);
    cube.animation = {}

    return cube;
  },

  sphere: () => {

  },

  pyramid: () => {

  },

  tetrahedron: (position, rotation) => {
    const tetraGeo = new THREE.TetrahedronGeometry(1);
    const tetraMat = Shape.generateMat();
    const tetra = new THREE.Mesh(tetraGeo, tetraMat);

    tetra.position.set(position.x, position.y, position.z);
    tetra.rotation.set(rotation.x, rotation.y, rotation.z);
    tetra.animation = {};

    return tetra;
  },

  octahedron: (position, rotation) => {
    const octaGeo = new THREE.OctahedronGeometry(1);
    const octaMat = Shape.generateMat();
    const octa = new THREE.Mesh(octaGeo, octaMat);

    octa.position.set(position.x, position.y, position.z);
    octa.rotation.set(rotation.x, rotation.y, rotation.z);
    octa.animation = {};

    return octa;
  },

  /**
  * @function billboard()
  * @param: {Object} position - An object containing x, y and z values for the
  *         biillboards starting position.
  * @param: {Object} rotation - Object containing x, y and z values for the
  *         billboards starting rotation values
  * Used to generate a billboard that plays a video, to be used in the scene.
  */
  billboard: (position, rotation) => {
    const billboard = new THREE.Mesh();

    const billGeo = new THREE.BoxGeometry(6, 4, 1);
    const billMat = new THREE.MeshPhongMaterial({ color: 0x333333, reflectivity: 1});
    const billboardBody = new THREE.Mesh(billGeo, billMat)
    billboardBody.name = "billboardBody";
    billboard.add(billboardBody);

    const video = document.getElementById('video');
    const screenGeo = new THREE.PlaneGeometry(5.8, 3.8);
    const screenVideoMat = new THREE.VideoTexture(video);
    screenVideoMat.minFilter = THREE.LinearFilter;
    screenVideoMat.magFilter = THREE.LinearFilter;
    screenVideoMat.format = THREE.RGBFormat;

    const screenMat = new THREE.MeshPhongMaterial({  map: screenVideoMat, emissive: 0x222222, emissiveMap: screenVideoMat })

    const billboardScreen = new THREE.Mesh(screenGeo, screenMat);
    billboardScreen.name = "billboardScreen";
    billboardScreen.position.set(0, 0, .51);
    billboard.add(billboardScreen);

    billboard.position.set(position.x, position.y, position.z);
    billboard.rotation.set(rotation.x, rotation.y, rotation.z);
    billboard.animation = {}

    return billboard;
  },

  custom: () => {

  },

   /**
     * {
          name: 'cube1',
          type: 'cube',
          animationDelay: 2000,
          position: { x: -500, y: 200, z: -3000 },
          rotation: {x: 45, y: 45, z: 0 }
        }
     */
    generateShape: (scene) => {
        const shapeTypes = ['cube', 'tetrahedron', 'octahedron'];
        const rotationValues = [45, 90, 270];

        const selectedType = shapeTypes[helpers.getRandomNumber(0, 2)]
        const selectedPos = {
            x: helpers.getRandomNumber(-750, 750),
            y: helpers.getRandomNumber(0, 500),
            z: helpers.getRandomNumber(-5000, -3000),
        }

        const selectedRot = {
            x: rotationValues[helpers.getRandomNumber(0, 2)],
            y: rotationValues[helpers.getRandomNumber(0, 2)],
            z: rotationValues[helpers.getRandomNumber(0, 2)],
        }

        const shape = Shape[selectedType](selectedPos, selectedRot);
        AnimateShape.float(shape, scene);

        return shape;
    },


  /**
  * @function generatMat()
  * Will generate a material with a random color and reflectivity value
  */
  generateMat: () => {
    const colors = [0xffffff, 0xffff00, 0xff00ff, 0xff0000, 0x00ffff, 0xaa00ff, 0x000000];
    const mat = new THREE.MeshPhongMaterial({
      color: colors[Shape.generateNum(6)],
      reflectivity: parseInt(`0.${Shape.generateNum(9)}`),
      flatShading: true
    });
    return mat;
  },

  /**
  * @function: generateNum()
  * @param: {Number} max - The max number to be generated.
  * This function simply spits out a random number between
  * 0 and max
  */
  generateNum: max =>  Math.floor(Math.random() * Math.floor(max))
}


export default Shape;
