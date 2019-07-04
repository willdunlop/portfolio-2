import dom, { Fragment } from 'jsx-render';

import Professional from '../app/professional';
import Personal from '../app/personal';
import Info from '../app/info';
import IFrame from "../app/common/iFrame";
import ProjectInfo from "../app/common/project-info";

const constants = {
    developMode: false,
    firebaseVersion: '5.5.5',
    // focusedWindow: '',

    toolchest: {
        menuTypes: ['professional', 'personal', "info"]
    },

    programs: {
        open: [],
        all: [{
            title: "Coming Soon",
            slug: "coming-soon",
            type: 'personal',
            icon: "/assets/images/icons/about.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '800px', height: '700px' },
                    pos: { top: '100px', left: '200px' },
                },
                mobile: {
                    size: { width: '100%', height: '100%' },
                    pos: { top: '0', left: '0' },
                }
            },
            // content: () => { return }
        }, {
            title: "About",
            slug: "about",
            type: 'info',
            icon: "/assets/images/icons/about.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '800px', height: '700px' },
                    pos: { top: '100px', left: '200px' },
                },
                mobile: {
                    size: { width: '100%', height: '100%' },
                    pos: { top: '0', left: '0' },
                }
            },
            content: props => <Info.About {...props} />
        },{
            title: "Welcome",
            slug: "welcome",
            type: 'info',
            icon: "/assets/images/icon/welcome.png",
            settings: { isResizable: true, dragOnly: true },
            style: {
                desktop: {
                    size: { width: '500px', height: '250px' },
                    pos: { top: '100px', left: '365px' },
                },
                mobile: {
                    size: { width: '100%', height: '250px' },
                    pos: { bottom: '50px', left: '0' },
                }
            },
            content: props => <Info.Welcome {...props} />
        },{
            // title: "Herbs of Gold",
            // slug: "herbs-of-gold",
            // type: 'professional',
            // icon: "/assets/images/herbs-of-gold.png",
            // settings: { isResizable: true },
            // style: {
            //     desktop: {
            //         size: { width: '90%', height: '100%' },
            //         pos: { top: '0', right: '0' },
            //     },
            //     mobile: {
            //         size: { width: '200px', height: '200px' },
            //         pos: { top: '0', left: '0' },
            //     }
            // },
            // content: () => <IFrame url="https://www.herbsofgold.com.au/" />
        }, {
            title: "Blooms The Chemist",
            slug: "blooms-website",
            type: 'professional',
            icon: "/assets/images/projects/blooms-site/blooms.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '800px', height: '640px' },
                    pos: { top: '100px', left: '300px' },
                },
                mobile: {
                    size: { width: '100%', height: '500px' },
                    pos: { bottom: '0', left: '0' },
                }
            },
            content: props => <Professional.BloomsSite {...props} />
        }, {
            title: "WebAR",
            slug: "web-ar",
            type: 'professional',
            icon: "/assets/images/projects/web-ar/icon.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '693px', height: '900px' },
                    pos: { top: '25px', right: '100px' },
                },
                mobile: {
                    size: { width: '100%', height: '100%' },
                    pos: { top: '0', left: '0' },
                }
            },
            content: props => <Professional.WebAR {...props} />
        }, {
            title: "Blackmores Mindful VR",
            slug: "blackmores-mindful-vr",
            type: 'professional',
            icon: "/assets/images/projects/blackmores-mindful-vr/icon.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '800px', height: '673px' },
                    pos: { bottom: '50px', right: '150px' },
                },
                mobile: {
                    size: { width: '100%', height: '100%' },
                    pos: { top: '0', left: '0' },
                }
            },
            content: props => <Professional.BlackmoresMindfulVR {...props} />
        }, {
            title: "Window Stats",
            slug: "windowStats",
            type: 'software',
            icon: "/assets/images/settings.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '375px', height: '300px' },
                    pos: { bottom: '0', right: '0' },
                },
                mobile: {
                    size: { width: '200px', height: '200px' },
                    pos: { top: '0', left: '0' },
                }
            },
            content: props => <Personal.WindowStats {...props} />
        }]
    },

    desktop: {
        shortcuts:[{
            title: "Welcome",
            icon: "/assets/images/icons/welcome.png",
            programSlug: "welcome",
            position: { top: '25px', right: '0' }
        }, {
            title: "About",
            icon: "/assets/images/icons/about.png",
            programSlug: "about",
            position: { top: '125px', right: '0' }
        }]
    },
    
};

export default constants;
