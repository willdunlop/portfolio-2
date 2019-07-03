import TWEEN from '@tweenjs/tween.js';
import dom from 'jsx-render'

import constants from '../constants';

import loaders from './loaders';
import ui from './ui';


const helpers = {

    loaders,
    ui,

    onStartUp: () => {
        const appearance = helpers.getProgram('appearance');
        helpers.ui.openWindow(appearance);
    },


    getProgram: slug => constants.programs.all.find(program => program.slug === slug),

    firstLetterUppercase: string => `${string[0].toUpperCase()}${string.slice(1)}`,

    getRandomHex(length) {
        const maxLength = 8;
        const min = Math.pow(16, Math.min(length, maxLength) - 1);
        const max = Math.pow(16, Math.min(length, maxLength)) - 1;
        const num = Math.floor( Math.random() * (max - min + 1)) + min;
        let str = num.toString(16);
        while(str.length < length) { str = str + helpers.getRandomHex(length - maxLength )}
        return str;
    },


    /**
     * @function shadeColor()
     * @param {String} color - a hex decimal that defines the color to be shaded
     * @param {Number} percent - a float between -1 and 1 that determines the shade amount
     * A function that was ripped from a stackoverflow answer by the user Pimp Trizkit.
     * The function takes a base color and shad amount and spits out a hex value that has been calculated
     * from the two arguments.
     * One of the most thorough and detailed answers I have ever seen, what a champ.
     * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
     */
    shadeColor: (color, percent) => {   
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    },

    /**
     * @function getRandomNumber()
     * @param {Number} min - The lowest value number allowed
     * @param {Number} max - The highest value number allowed
     * Returns a random number anywhere between the ranges of min and max
     */
    getRandomNumber: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    animations: {
        createTween: (shapeProperty, endPosition, duration, whenCompleted = function() {}) => {
            return new TWEEN.Tween(shapeProperty)
                .to(endPosition, duration)
                // .delay(delay)
                .onComplete(whenCompleted);
          }
    
    },

   

 };
  
export default helpers;