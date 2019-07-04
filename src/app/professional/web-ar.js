import dom from "jsx-render";

import ProjectInfo from "../common/project-info";

const title = "WebAR"
const body = "Using WebGL/Three.js I was able to produce a prototype web-ar application that would allow a user to choose an item from a catalogue and place it within their immediate environment. The user is able to control the product's location and rotationin order to place it exactly how they please. The AR functionality requires a marker in order to anchor the virtual object in relation to it's environment. The marker is printed into a catalogue and consists of a QR code that will take the user directly to the application. A service worker was used in order to provide a progressive web app experience in order to \"install\" the application onto the users phone";
const images = [
    "assets/images/projects/web-ar/01.png",
    "assets/images/projects/web-ar/02.png",
    "assets/images/projects/web-ar/03.png"
]

const url = false;

const WebAR = props => <ProjectInfo 
    {...props}
    title={title}
    body={body}
    images={images}
    url={url}
/>;

export default WebAR;