/**
 *                       By William Dunlop
 *   _____           _ _        ____      
 *  |_   _|         | (_)      / __ \     
 *    | |  _ __   __| |_  __ _| |  | |___ 
 *    | | | '_ \ / _` | |/ _` | |  | / __|
 *   _| |_| | | | (_| | | (_| | |__| \__ \
 *  |_____|_| |_|\__,_|_|\__, |\____/|___/
 *                        __/ |           
 *                       |___/            
 *      A place for discussing artistic 
 *     predilections and it's philosophy...
 */


import dom from 'jsx-render'

import Core from './core'
import App from './app';
// import firebaseConf from '../firebase-config';
// import helpers from './config/helpers';

import './style/main.scss'; 

/**
 * Firebase has been added as a script tag that uses a google host.
 * Lazy loading of any extra firebase modules can occur through the use
 * of helpers.loadFirebase().
 * 
 */
// firebase.initializeApp(firebaseConf);


const ui = document.getElementById('ui');
ui.appendChild(<App />);




/**
 * Core is your 3d shit that appends to the container div specified directly in the html file.
 * It acts as a hectic background, could do with a rename though as "Core" means fuck all
 */
new Core();

/**
 * 
 * Consider iro.js for color picker
 * 
 * BIG OL TODO
 * 
 * Polyfills
 * - focus-within - https://github.com/jonathantneal/postcss-focus-within
 * - css variables - https://www.npmjs.com/package/css-vars-ponyfill
 * 
 */