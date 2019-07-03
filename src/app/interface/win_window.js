import dom, { Fragment } from 'jsx-render';

import constants from '../../config/constants';
import helpers from '../../config/helpers';

function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    Object.keys(element.children).forEach(key => {
        if (element.children[key].id === "windowBanner") {
            element.children[key].onmousedown = dragMouseDown;
        }
    });

    function dragMouseDown(e) {
        e = e || window.event;
        // e.preventDefault();  // This will remove focus on banner click
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


const Window = (props) => {
    let window;
    let headerElem;
    let closeButton;
    let maxButton;
    let minButton;

    function closeWindow(windowElem) {
        windowElem.parentNode.removeChild(windowElem);
        const openProgIndex = constants.programs.open.indexOf(windowElem.id);
        if (openProgIndex > -1) constants.programs.open.splice(openProgIndex, 1);
        helpers.ui.start.removeWindowFromTray(windowElem.id);
    }

    function maximiseWindow(windowElem) {
        console.log("CL", windowElem.classList)
        if(windowElem.classList.contains("window__maximise")) {
            console.log("MAXIMISE: removing class");
            windowElem.classList.remove("window__maximise")
        } else {
            console.log("MAXIMISE: adding class");
            windowElem.classList.add("window__maximise")
        }
    }

    function minimiseWindow(windowElem) {
        if(windowElem.classList.contains("window__minimise")) {
            console.log("MINIMISE: removing class");
            windowElem.classList.remove("window__minimise")
        } else {
            console.log("MINIMISE: adding class");
            windowElem.classList.add("window__minimise")
        }

    }

    function focusWindow(programSlug) {
        const trayItem = document.getElementById(`trayItem-${programSlug}`)
        // trayItem.classList.add("start__tray-item--focus");
        trayItem.focus();
        window.classList.add("window__focus");
    }

    function blurWindow(programSlug) {
        const trayItem = document.getElementById(`trayItem-${programSlug}`)
        trayItem.classList.remove("start__tray-item--focus");
        window.classList.remove("window__focus");

    }


    const jsx = 
        <Fragment>
            <div ref={win => { window = win }} id={props.program.slug} className="window" tabindex="1">
                <div
                    id="windowBanner"
                    className="window__title"
                >
                    <div className="window__buttons">
                        <button ref={btn => { minButton = btn }} className="window__button window__button--minimize"><span className="fa fa-minus">_</span></button>
                        <button ref={btn => { maxButton = btn }} className="window__button window__button--expand"><span className="fa fa-square-o">□</span></button>
                        <button ref={btn => { closeButton = btn }} className="window__button window__button--close"><span className="fa fa-times">X</span></button>
                    </div>
                    <h1> {props.program.title} </h1>
                </div>
                <ul className="toolbar">
                    <li><u>F</u>ile</li>
                    <li><u>E</u>dit</li>
                    <li><u>V</u>iew</li>
                    <li><u>H</u>elp</li>
                </ul>
            
                <div className="window__body">
                    {props.program.content}
                </div>
            
                <div className="statusbar">
                    <div className="left">3 object(s)</div>
                    <div className="right">&nbsp;</div>
                </div>
            </div>
        </Fragment>;

        closeButton.onclick = () => closeWindow(window);
        maxButton.onclick = () => maximiseWindow(window);
        minButton.onclick = () => minimiseWindow(window)
        window.onfocus = () => focusWindow(props.program.slug);
        window.onblur = () => blurWindow(props.program.slug);

        dragElement(window);

    return jsx;

}

export default Window;