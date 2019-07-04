import dom from "jsx-render"

class Carousel {
    constructor(props) {
        this.props = props;

        this.carousel;
        this.previous;
        this.next;

        this.fadeNext = this.fadeNext.bind(this);
        this.render = this.render.bind(this);
    }

    fadeNext() {

    }

    render() {
        const jsx = <div id="content-slider">

                    <ul className="carousel">
                        <li id="first" className="carousel__item">
                            <img className="carousel__img" src={this.props.images[0]} />
                        </li>

                    </ul>

        </div>
        // this.next.onclick = this.fadeNext;
        return jsx;
    }
}

export default Carousel;