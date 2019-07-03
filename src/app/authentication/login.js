import dom from 'jsx-render';
// import { firebase } from '@firebase/app';

import Registration from './registration';
import helpers from '../../config/helpers';
import constants from '../../config/constants';

class Login {
    constructor(props) {
        this.props = props;

        this.form;
        this.userInput;
        this.passwordInput;
        this.loginBtn;
        this.newUserBtn;

        this.submitLogin = this.submitLogin.bind(this);
        this.showRegistrationForm = this.showRegistrationForm.bind(this);
        this.render = this.render.bind(this);
    }

    submitLogin(e) {
        e.preventDefault();
        console.log("submitting login")
        const email = this.userInput.value;
        const password = this.passwordInput.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log("login succesful", res)
            }).catch(err => {
                console.log("login unsuccesful", err)
            })
    }
    
    showRegistrationForm() {
        if (constants.programs.open.includes("registration")) {
            const registrationWindow = document.getElementById("registration");
            registrationWindow.focus();
            
        } else {
            const newUserProg = {
                title: "Registration",
                slug: "registration",
                settings: { isResizable: false, canMinimise: false },
                style: {
                    desktop: {
                        size: { width: '500px', height: 'auto' },
                        pos: { top: '20%', left: '65%' },
                    },
                    mobile: {
                        size: { width: '375px', height: '400px' },
                        pos: { top: '35%', left: '0' },
                    }
                },
                content: props => <Registration {...props} />
            };

            helpers.ui.openWindow(newUserProg);
        }
    }

    render() {
        const jsx = 
            <div className="basic authentication">
            <h1>Saved Users</h1>
                <div className="workbench authentication__users">
    
                    <div className="authentication__user" tabindex="1">
                        <img className="authentication__user-icon" src="assets/images/computer.png" />
                        <p className="authentication__user-name">Guest</p>
                    </div>
    
                </div>
    
                <form ref={frm => this.form = frm} className="authentication__form">
                    <div className="row">
                        <label className="authentication__input-label" >User: </label>
                        <input ref={inpt => this.userInput = inpt} className="text-input authentication__form-username" type="text" />
                    </div>
                    <div className="row">
                        <label className="authentication__input-label" >Password: </label>
                        <input ref={inpt => this.passwordInput = inpt} className="text-input authentication__form-username" type="password" />
                    </div>
                    <div className="buttons-container buttons-container--right">
                        <div className="primary-button-container">
                            <button className="button primary-button">Login</button>
                        </div>
    
                        <div className="secondary-button-container">
                            <button ref={btn => this.newUserBtn = btn} type="button" className="button primary-button">New User</button>
                        </div>
    
                    </div>
                </form>
            </div>;

            this.form.onsubmit = this.submitLogin;
            this.newUserBtn.onclick = this.showRegistrationForm;
    
        return jsx;
    }
}

export default Login;