import dom, { Fragment } from "jsx-render";

import events from "../../config/events";

class WindowStats {
    constructor(props) {
        this.props = props;

        this.focusedWindow = {};

        this.updateFocusedWindow = this.updateFocusedWindow.bind(this);
        this.updateWindowData = this.updateWindowData.bind(this);
        this.render = this.render.bind(this);
    } 

    updateFocusedWindow(e) {
        // this.resetWindowListeners();
        this.focusedWindow = document.getElementById(e.detail.windowId);
        this.focusedProgram = e.detail.program;
        

        this.focusedWindow.addEventListener("resize", this.updateWindowData);
        this.focusedWindow.addEventListener("indigOs.windowDrag", this.updateWindowData);

        this.updateWindowData()
    }

    updateWindowData(e) {
        this.windowDataDOM.innerHTML = "";
        const jsx = <Fragment>
            <tr className="ws__row">
                <td className="ws__key">ElementID :</td>
                <td className="ws__value">{this.focusedWindow.id}</td>
            </tr>
            <tr className="ws__row">
                <td className="ws__key">Window Position :</td>
                <td className="ws__value">{this.focusedWindow.style.left}  X  {this.focusedWindow.style.top}</td>
            </tr>
            <tr className="ws__row">
                <td className="ws__key">Window Size :</td>
                <td className="ws__value">{this.focusedWindow.clientWidth}px  X  {this.focusedWindow.clientHeight}px</td>
            </tr>
        </Fragment>;

        this.windowDataDOM.appendChild(jsx)
    }

    updateProgramData() {
        this.programDataDOM.innerHTML = "";

    }

    render() {
        const jsx = <div ref={elm => this.winStatsDOM = elm} className="window-stats">
            <table className="window-stats__window">
                <thead>
                    <tr><th colSpan="2">Window</th></tr>
                </thead>
                <tbody ref={elm => this.windowDataDOM = elm}>No active window detected</tbody>
            </table>

            <table className="window-stats__program">
                <thead>
                    <tr><th colSpan="2">Program</th></tr>
                </thead>
                <tbody ref={elm => this.programDataDOM = elm}>No active program detected</tbody>
            </table>
        </div>;

        window.addEventListener("indigOs.windowFocusChange", this.updateFocusedWindow)

        return jsx;
    }
}

export default WindowStats;