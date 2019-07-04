import dom from "jsx-render";

import ProjectInfo from "../common/project-info";

const title = "Blooms The Chemist - Website";
const body = "I worked alongside a senior developer in order to help produce a detailed an informative wordpress build for Blooms The Chemist";
const images = [
    "assets/images/projects/blooms-site/blooms-01.png",
    "assets/images/projects/blooms-site/blooms-02.png",
    "assets/images/projects/blooms-site/blooms-03.png"
]
const url = "https://www.bloomsthechemist.com.au";

const BloomsSite = props => <ProjectInfo 
    {...props}
    title={title}
    body={body}
    images={images}
    url={url}
/>;

export default BloomsSite;