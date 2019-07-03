import dom, { Fragment } from 'jsx-render';


class TitleCollapser {
    constructor(props) {
        this.props = props;
        this.collapser;

        this.collapseElement = this.collapseElement.bind(this);
        this.render = this.render.bind(this);
    }

    collapseElement() {
        const element = document.getElementById(this.props.elementId);
        const { display } = element.style;
        if (display === 'none') element.style.display = 'block';
        else element.style.display = 'none';
    }

    render() {
        const jsx = 
            <div ref={elm => this.collapser = elm} className="title-collapser">
                <span className="title-collapser__title">{this.props.title}</span>
                {/* <span className="appearance__settings-viewer-line" /> */}
                <span className="title-collapser__toggle"> ^</span>
            </div>;

    
        this.collapser.onclick = this.collapseElement;
    
        return jsx;
    }
}

export default TitleCollapser;