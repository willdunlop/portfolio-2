import dom from "jsx-render"

import Carousel from "./carousel";

class ProjectInfo {
    constructor(props) {
        this.props = props;

        this.render = this.render.bind(this);
    }

    renderSiteButton() {
        if (!this.props.url) return;
        return <a 
            className="project-info__site-link"
            href={this.props.url}
            target="_blank"
            rel="noopener noreferrer"
        >Go to site</a>;

    }

    render() {
        const jsx = <div className="project-info basic">
            <Carousel images={this.props.images} />

            <div className="project-info__description">
                <h1 className="project-info__title">{this.props.title}</h1>
                <p className="project-info__body">{this.props.body}</p>
                {this.renderSiteButton()}
            </div>

        </div>;

        return jsx
    }
}

export default ProjectInfo;