import helpers from '../../config/helpers';

const { animations } = helpers;

const AnimateShape = {

  float: (shape, scene, delay = 0) => {
    let upScale = {x: 175, y: 175, z: 175 };
    let downScale = { x: 1, y: 1, z: 1 };
    let endTranslation = {x: shape.position.x, y: shape.position.y, z: 2000};
    shape.animation.upScale = animations.createTween(shape.scale, upScale, 1000);
    shape.animation.translate = animations.createTween(shape.position, endTranslation, helpers.getRandomNumber(30000, 60000));
    shape.animation.downScale = animations.createTween(shape.scale, downScale, 1000, function(){ scene.remove(shape) });

    shape.animation.upScale.start();
    shape.animation.upScale.chain(shape.animation.translate);
    shape.animation.translate.chain(shape.animation.downScale)
  },

  beatPulse: () => {

  },

  removeTween: () => {

  },

}

export default AnimateShape;
