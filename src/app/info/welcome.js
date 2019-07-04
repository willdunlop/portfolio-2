import dom from "jsx-render";

class Welcome {
    constructor(props) {
        this.props = props;

        this.render = this.render.bind(this);
    }

    render() {
        const jsx = <div className="welcome basic">
            <h1 className="welcome__title">Welcome</h1>
            <div className="welcome__body">
                <p>My name is William Dunlop and I am a fullstack web developer</p>
                <p>Use the menu on the side or click one of the shortcuts on the desktop to begin</p>
            </div>
            <button ref={elm => this.dismissBtn = elm} className="primary-button">Dismiss</button>
        </div>;

        this.dismissBtn.onclick = this.props.close;

        return jsx;
    }
}

export default Welcome;