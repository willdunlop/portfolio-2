import dom from "jsx-render";

class IFrame {
    constructor(props) {
        this.props = props;

        this.render = this.render.bind(this);
    }

    render() {
        const jsx = <div className="iframe-comp">
            <iframe
                className="iframe-comp__iframe"
                src={this.props.url}
            ></iframe>
            <div className="iframe-comp__description">
                <h1 className="iframe-comp__title">Herbs of Gold</h1>
                <p>Herbs of Gold is a herbal and nutritional supplements vendor</p>
                <a 
                    className="iframe-comp__site-link"
                    href={this.props.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >Go to site</a>
            </div>

        </div>;

        return jsx;
    }
}

export default IFrame;