import dom from "jsx-render";

import ProjectInfo from "../common/project-info";

const title = "Blackmores Mindful VR"
const body = "A web-based virtual reality application that uses a Muse headband to detect whether a user is in a \'calm\' or \'active\' mental state. A calm mind would produce a tranquil ocean, where as an active mind would create a violent and turbulent ocean. The experience would walk the user through the process of achieving both states of mind and would provide for them a score based on their performance. A part of this project included the development of an admin dashboard that would provide a Blackmore's employee control over the experience.";
const images = [
    "assets/images/projects/blackmores-mindful-vr/02.png",
    "assets/images/projects/blackmores-mindful-vr/01.png",
    "assets/images/projects/blackmores-mindful-vr/03.png"
]

const url = false;

const BlackmoresMindfulVR = props => <ProjectInfo 
    {...props}
    title={title}
    body={body}
    images={images}
    url={url}
/>;

export default BlackmoresMindfulVR;