import dom, { Fragment } from 'jsx-render'

import Shortcut from './interface/shortcut';
import Toolchest from './interface/toolchest';
import Tray from './interface/tray';
import Window from "./interface/window";


import constants from '../config/constants';
import helpers from '../config/helpers';




class App {
    constructor() {

        this.desktop;

        this.openWindow = this.openWindow.bind(this);

        this.render = this.render.bind(this);
    }

    /**
     * @function openWindow()
     * @param {Object} program - A program object containing some parameters and the program itself
     * @param {Object} options - Contains settings for the window 
     *      @param {Boolean} options.isResizable
     *      @param {Boolean} options.dragOnly
     */
    openWindow(program) {
        const newWindow = <Window program={program} />;
        this.desktop.appendChild(newWindow);
        constants.programs.open.push(program.slug);
        // const newWindow = document.getElementById(program.slug);
        newWindow.focus();
    }

    closeAllWindowsAndClearDesktop() {
        const desktop = document.getElementById("desktop");
        while (desktop.firstChild) desktop.removeChild(desktop.firstChild);
        constants.programs.open = [];
    }


    populateDesktop() {
        // helpers.ui.closeAllWindowsAndClearDesktop();
        const example =
            <Fragment>
                {constants.desktop.shortcuts.map(shortcut => 
                    <Shortcut 
                        data={shortcut}
                        openWindow={this.openWindow}
                    />
                )}
                <Toolchest 
                    openWindow={this.openWindow}
                />
                <Tray />
            </Fragment>;

        this.desktop.appendChild(example);
    }

    initStartupSoftware() {
        // const actionShell = helpers.getProgram("actionshell");
        const windowStats = helpers.getProgram("windowStats");
        this.openWindow(windowStats)
    }


    render() {
        const jsx =
            <div id="app" className="app">
                <div ref={elm => this.desktop = elm} id="desktop" className="app__desktop">
                    {/* Put in a loader window here that will be cleared once auth has loaded */}
                </div>
            </div>;
       
        this.populateDesktop();

        // this.initStartupSoftware()
    
        return jsx
    }
}

export default App;
