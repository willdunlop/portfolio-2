import dom, { Fragment } from 'jsx-render';


import Authentication from '../app/authentication';
import Personal from '../app/personal';
import System from '../app/system';
import IFrame from "../app/common/iFrame";

const constants = {
    developMode: false,
    firebaseVersion: '5.5.5',
    // focusedWindow: '',

    toolchest: {
        menuTypes: ['professional', 'personal', "system"]
    },

    programs: {
        open: [],
        all: [{
            title: "About",
            slug: "about",
            type: 'system',
            icon: "/assets/images/notepad.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '500px', height: '300px' },
                    pos: { top: '100px', left: '200px' },
                },
                mobile: {
                    size: { width: '200px', height: '200px' },
                    pos: { top: '0', left: '0' },
                }
            },
            // content: props => <Software.ActionShell {...props} />
        },{
            title: "Herbs of Gold",
            slug: "herbs-of-gold",
            type: 'professional',
            icon: "/assets/images/herbs-of-gold.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '90%', height: '100%' },
                    pos: { top: '0', right: '0' },
                },
                mobile: {
                    size: { width: '200px', height: '200px' },
                    pos: { top: '0', left: '0' },
                }
            },
            content: () => <IFrame url="https://www.herbsofgold.com.au/" />
        },{
            title: "Blooms The Chemist",
            slug: "blooms-website",
            type: 'professional',
            icon: "/assets/images/blooms.png",
            settings: { isResizable: true },
            style: {
                desktop: {
                    size: { width: '500px', height: '300px' },
                    pos: { top: '100px', left: '200px' },
                },
                mobile: {
                    size: { width: '200px', height: '200px' },
                    pos: { top: '0', left: '0' },
                }
            },
            content: props => <IFrame {...props} />
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
            title: "Test Shortcut",
            icon: "/assets/images/computer.png",
            programSlug: "shortcut",
            position: { top: '25px', right: '0' }
        }, {
            title: "3D Demo",
            icon: "/assets/images/programs.png",
            programSlug: "3dDemo",
            position: { top: '25px', right: '100px' }
        }, {
            title: "★ VaporMix #2 ★",
            icon: "/assets/images/music.png",
            programSlug: "vapormix2",
            position: { top: '125px', right: '0' }
        }, {
            title: "About",
            icon: "/assets/images/notepad.png",
            programSlug: "about",
            position: { top: '225px', right: '0' }
        }]
    },
    
};

export default constants;
