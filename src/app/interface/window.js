import dom from 'jsx-render';
import Resizable from 'resizable';

import constants from '../../config/constants';
import helpers from '../../config/helpers';
import events from "../../config/events";


/**
 * @function Window()
 * @param {Object} props - Object containing component properties
 *      @param {Object} props.program - The program object being loaded within the window
 *      @param {object} props.options - An Object containing options for the window such as
 *          @param {Boolean} props.options.isResizable  - default: true
 *          @param {Boolean} props.options.dragOnly     - default: false
 */
class Window {
    constructor(props) {
        // super(props);
        
        this.props = props;
        this.isMaxed = false;
        this.preMaxState = {};
        this.windowId = this.generateID();
        this.resizeEvent = new Event(`resize-${props.program.slug}`);

        if (this.props.program.settings === undefined) this.props.program.settings = {};
        if (this.props.program.settings.isResizable === undefined) this.props.program.settings.isResizable = true;
        if (this.props.program.settings.canMinimise === undefined) this.props.program.settings.canMinimise = true;
        if (this.props.program.settings.dragOnly === undefined) this.props.program.settings.dragOnly = false;    

        this.focusWindow = this.focusWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.minimiseWindow = this.minimiseWindow.bind(this);
        this.maximiseWindow = this.maximiseWindow.bind(this);
        this.scrollBodyToBottom = this.scrollBodyToBottom.bind(this);

        this.render = this.render.bind(this);
    }

    /** 
     * FUNCTIONS 
     */
    closeWindow() {
        this.windowElem.parentNode.removeChild(this.windowElem);
        const openProgIndex = constants.programs.open.indexOf(this.windowElem.id);
        if (openProgIndex > -1) constants.programs.open.splice(openProgIndex, 1);
        // helpers.ui.start.removeWindowFromTray(this.windowElem.id);
    }

    maximiseWindow() {
        if(this.isMaxed) {
            this.windowElem.style.width = this.preMaxState.width;
            this.windowElem.style.height = this.preMaxState.height;
            this.windowElem.style.top = this.preMaxState.top;
            this.windowElem.style.left = this.preMaxState.left;
            this.windowElem.style.transform = this.preMaxState.transform;
            console.log("super.ref", super.ref)
            this.maxButton.innerHTML = 'O';
            document.dispatchEvent(this.resizeEvent);
            this.isMaxed = false;
        } else {
            this.preMaxState = {
                width: this.windowElem.style.width,
                height: this.windowElem.style.height,
                top: this.windowElem.style.top,
                left: this.windowElem.style.left,
                transform: this.windowElem.style.transform
            };

            this.windowElem.style.width = '100%';
            this.windowElem.style.height = '100%';
            this.windowElem.style.top = 0;
            this.windowElem.style.left = 0;
            this.windowElem.style.transform = 'none';
            
            this.maxButton.innerHTML = 'o';
            document.dispatchEvent(this.resizeEvent);
            this.isMaxed = true;
        }
        // this.windowElem.focus();
        this.focusWindow();
    }

    minimiseWindow() {
        if(this.windowElem.classList.contains("window__minimise")) {
            this.removeWindowFromTray(this.windowElem.id);
            this.windowElem.classList.remove("window__minimise");
        } else {
            this.addWindowToTray(this.windowElem.id);
            this.windowElem.classList.add("window__minimise");
        }
    }

    setEventOptions() {
        helpers.ui.dragElement(this.windowElem, "window");

        this.closeButton.onclick = this.closeWindow
        this.minButton.onclick = this.minimiseWindow
        this.maxButton.onclick = this.maximiseWindow

        if(this.props.program.settings.isResizable) {
            const resizable = new Resizable(this.windowElem);
            resizable.on('resize', () => {
                document.dispatchEvent(this.resizeEvent);
                if (this.isMaxed) {
                    this.maxButton.innerHTML = 'O';
                    this.isMaxed = false;
                }
            });
        }
    }

    setWindowStyleOptions() {
        if (this.props.program.style) {
            if(window.innerWidth > 768) {
                /** Desktop */
                if (this.props.program.style.desktop.size.width) this.windowElem.style.width = this.props.program.style.desktop.size.width;
                if (this.props.program.style.desktop.size.height) this.windowElem.style.height = this.props.program.style.desktop.size.height;
                if (this.props.program.style.desktop.pos.top) this.windowElem.style.top = this.props.program.style.desktop.pos.top;
                if (this.props.program.style.desktop.pos.bottom) this.windowElem.style.bottom = this.props.program.style.desktop.pos.bottom;
                if (this.props.program.style.desktop.pos.left) this.windowElem.style.left = this.props.program.style.desktop.pos.left;
                if (this.props.program.style.desktop.pos.right) this.windowElem.style.right = this.props.program.style.desktop.pos.right;

            } else {
                /** Mobile */
                if (this.props.program.style.mobile.size.width) this.windowElem.style.width = this.props.program.style.mobile.size.width;
                if (this.props.program.style.mobile.size.height) this.windowElem.style.height = this.props.program.style.mobile.size.height;
                if (this.props.program.style.mobile.pos.top) this.windowElem.style.top = this.props.program.style.mobile.pos.top;
                if (this.props.program.style.mobile.pos.bottom) this.windowElem.style.bottom = this.props.program.style.mobile.pos.bottom;
                if (this.props.program.style.mobile.pos.left) this.windowElem.style.left = this.props.program.style.mobile.pos.left;
                if (this.props.program.style.mobile.pos.right) this.windowElem.style.right = this.props.program.style.mobile.pos.right;

            }
        }

        if (!this.props.program.settings.isResizable) this.maxButton.style.display = 'none';
        if (!this.props.program.settings.canMinimise) this.minButton.style.display = 'none';
        if (this.props.program.settings.dragOnly) {
            this.closeButton.style.display = 'none';
            this.minButton.style.display = 'none';
            this.maxButton.style.display = 'none';
        }

    }

    generateID() { return `${helpers.getRandomHex(8)}-${this.props.program.slug}`; }

    focusWindow() {
        this.windowElem.focus();
        window.dispatchEvent(events.windowFocusChange(this.windowId, this.props.program));
    }

    scrollBodyToBottom() {
        this.winBody.scrollTop = this.winBody.scrollHeight
    }

    /**
     * TRAY STUFF
     */
    restoreAndFocusWindow(isDrag) {
        if (isDrag) { isDrag = false; return; }
        this.removeWindowFromTray();
        this.windowElem.classList.remove("window__minimise");
        // this.windowElem.focus();
        this.focusWindow();
    }

    trayItemBlur() {
        if (this.windowElem.classList.contains("window__focus")) {
            this.windowElem.classList.remove("window__focus");
        }
    }

    addWindowToTray(programId) {
        const tray = document.getElementById("tray");

                const trayItemJsx =
                    <li ref={ti => this.trayItem = ti } id={`trayItem-${programId}`} className="tray__item animated fadeInRight" tabindex="1">
                        <div className="tray__item-image">
                            <img className="tray__item-icon" src={this.props.program.icon} />
                        </div>
                        <div className="tray__item-title">{this.props.program.title}</div>
                    </li>
                
                let isDrag = false;
                this.trayItem.onmousedown = () => isDrag = false;
                this.trayItem.addEventListener("touchstart", () => isDrag = false)
                this.trayItem.onmousemove = () => isDrag = true;
                this.trayItem.addEventListener("touchmove", () => isDrag = true)

                this.trayItem.onclick = () => this.restoreAndFocusWindow(isDrag);
                this.trayItem.onblur = () => this.trayItemBlur();
                tray.appendChild(trayItemJsx);
    }

    removeWindowFromTray() {
        this.trayItem.parentNode.removeChild(this.trayItem);
    }



    /**
     * MARKUP
     */
    render() {
        const jsx =
            <div ref={elm => this.windowElem = elm} id={this.windowId} className="window animated zoomIn" tabindex="1">
                <div id="dragHeader" className="window__header">
                    <button ref={elm => this.closeButton = elm} className="window__header-btn">-</button>
                    <div id="windowBanner" className="window__header-title">{this.props.program.title}</div>
                    <button ref={elm => this.minButton = elm} className="window__header-btn">.</button>
                    <button ref={elm => this.maxButton = elm} className="window__header-btn">O</button>
                </div>

                {/* Optional file menu will go here, controlled by props */}

                <div ref={elm => this.winBody = elm} className="window__body">
                    {/* Pass through closeWindow as props */}
                    {this.props.program.content({ 
                        close: this.closeWindow,
                        // scrollBodyToBottom: this.scrollBodyToBottom
                    })}
                </div>
            </div>;

        this.setEventOptions();        
        this.setWindowStyleOptions();

        this.windowElem.onfocus = this.focusWindow;

        return jsx;
    }
}

export default Window;