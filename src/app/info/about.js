import dom from "jsx-render";

class About {
    constructor(props) {
        this.props = props;

        this.render = this.render.bind(this);
    }

    render() {
        const jsx = <div className="about basic">
            <h1 className="about__title">William Dunlop</h1>
            <div className="about__body">
                <div className="about__body-head">
                    <div className="about__body-head-profile">
                        <img className="about__body-head-image" src="assets/images/profile-picture.jpg" />
                    </div>
                    <div className="about__body-head-description">
                        <p>Hi, my name is William Dunlop and I am a fullstack web developer based in Sydney, Australia.</p>
                        <p>I'm currently involved with web technologies such as WebGL/Three.js for the development of 3D environments, as well as both augmented and virtual reality applications. The full list of technologies that I am experienced with includes:</p>
                    </div>
                </div>
                <br/>
                <h1>Frontend:</h1>
                <p>HTML | CSS/SCSS | Ruby/Rails | JavaScript/Typescript | Node.js | React | Redux | WebGL/Three.js</p>
                <br />
                <h1>Backend:</h1>
                <p>Express | MongoDB/Mongoose | Mocha and Sinon for unit tests</p>
                <br/>
                <h1>DevOps:</h1>
                <p>Amazon Web Services | Firebase | Digital Ocean</p>
                <br />
                <p>I'm also in the early stages of familiarising myself with:</p>
                <p>C/C++ | Web Assembly | Blender | C#/Unity</p>
                <br/>
                <p>Previous to my career as a web developer, I was involved in the 2D/3D animation industry using technologies such as Maya, Photoshop, Unreal Engine 4, Adobe Flash, Substance Designer and Quixel's Ddo. With this knowledge, I was able to independently and collaboratively produce various animations and game environments which helped to quench my thirst for creativity.</p>
            </div>
            <div className="about__close">
                <button ref={elm => this.dismissBtn = elm} className="primary-button about__close-btn">Dismiss</button>
            </div>
        </div>;

        this.dismissBtn.onclick = this.props.close;

        return jsx;
    }
}

export default About;