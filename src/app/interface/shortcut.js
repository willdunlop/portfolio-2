import dom from 'jsx-render';

import helpers from '../../config/helpers';


class Shortcut {
    constructor(props) {
        this.props = props;
        this.shortcut;
        this.doubleTapped = false;
        this.program = helpers.getProgram(this.props.data.programSlug);

        this.tapHandler = this.tapHandler.bind(this);
        this.render = this.render.bind(this);
    }


    /** FUNCTIONS */
    tapHandler(e) {
        if (!this.doubleTapped) {
            this.doubleTapped = true;
            setTimeout(() => { this.doubleTapped = false }, 300);
            return false;
        }
        e.preventDefault();

        /** Double tap action is written below */
        this.props.openWindow(this.program);
    }

    /** MARKUP */
    render() {
        const jsx =
            <div ref={sc => { this.shortcut = sc }} className="shortcut animated bounceIn" tabindex="1">
                <img className="shortcut__icon" src={this.props.data.icon} />
                <div className="shortcut__title" >
                    {this.props.data.title}
                </div>
            </div>;
        
        helpers.ui.dragElement(this.shortcut, "simple");
        this.shortcut.ondblclick = () => this.props.openWindow(this.program);
        this.shortcut.addEventListener("touchstart", this.tapHandler);
        this.shortcut.style.top = this.props.data.position.top;
        this.shortcut.style.right = this.props.data.position.right;
    
    
        return jsx;
    }
}

export default Shortcut;