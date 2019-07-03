import dom from "jsx-render";

class IFrame {
    constructor(props) {
        this.props = props;

        this.render = this.render.bind(this);
    }

    render() {
        const jsx = <div className="iframe-comp">
            <a 
                className="iframe-comp__site-link"
                href={this.props.url}
                target="_blank"
                rel="noopener noreferrer"
            >Go to site</a>
            <iframe
                className="iframe-comp__iframe"
                src={this.props.url}
            ></iframe>
        </div>;

        return jsx;
    }
}

export default IFrame;