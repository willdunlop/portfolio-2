import dom from 'jsx-render';
// import {firebase} from '@firebase/app';


class LogOut {
    constructor(props) {
        this.props = props;

        this.logOutBtn;
        this.cancelBtn;

        this.render = this.render.bind(this);
    }

    logOutUser() {

    }

    render() {
        const jsx =
            <div className="basic">
                <h1>Are you sure you wish to log out?</h1>

                <div className="buttons-container buttons-container--right">
                    <div className="primary-button-container">
                        <button ref={btn => this.logOutBtn = btn} className="button primary-button">Log Out</button>
                    </div>

                    <div className="secondary-button-container">
                        <button ref={btn => this.cancelBtn = btn} type="button" className="button secondary-button">Cancel</button>
                    </div>
                </div>
            </div>;

        this.logOutBtn.onclick = () => firebase.auth().signOut();
        this.cancelBtn.onclick = this.props.close;

        return jsx;
    }
}

export default LogOut;