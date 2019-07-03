import dom from 'jsx-render';
// import {firebase} from '@firebase/app';

import service from '../../service';

class Registration {
    constructor(props) {
        this.props = props;

        this.usernameInput;
        this.emailInput;
        this.passwordInput;
        this.passwordConfirmInput;

        this.registerBtn;
        this.cancelBtn;

        this.submitRegistration = this.submitRegistration.bind(this);
        this.render = this.render.bind(this);
    }

    submitRegistration(e) {
        console.log("e", e)
        e.preventDefault();
        console.dir(this.emailInput);
        let uid
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const passwordConfirm = this.passwordConfirmInput.value;
        
        //  sanitize this shit in a cloud function
        if(password === passwordConfirm) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log("then does work", res);
                uid = res.user.uid;
                // service.users.post()
            }).then(() => {
                const userData = {
                    uid,
                    email,
                }
                service.users.post(userData);
            }).catch(error => {
                console.log("errorCode", error.code);
                console.log("errorMessage", error.message);
            });
        } else {
            console.log("passwords did not match")
        }
    }

    render() {
        const jsx =
            <div className="basic">
                <form ref={frm => this.form = frm} className="registration__form">
                    <h1>New User</h1>
                    <div className="row">
                        <label className="registration__label">Username:</label>
                        <input ref={inp => this.usernameInput = inp} type="text" className="text-input"/>
                    </div>
                    <div className="row">
                        <label className="registration__label">Email:</label>
                        <input ref={inp => this.emailInput = inp} type="email" className="text-input"/>
                    </div>
                    <div className="row">
                        <label className="registration__label">Password:</label>
                        <input ref={inp => this.passwordInput = inp} type="password" className="text-input"/>
                    </div>
                    <div className="row">
                        <label className="registration__label">Confirm Password:</label>
                        <input ref={inp => this.passwordConfirmInput = inp} type="password" className="text-input"/>
                    </div>


                    <div className="buttons-container buttons-container--right">
                        <div className="primary-button-container">
                            <button className="button primary-button">Register</button>
                        </div>
    
                        <div className="secondary-button-container">
                            <button ref={btn => this.cancelBtn = btn} type="button" className="button secondary-button">Cancel</button>
                        </div>
    
                    </div>


                </form>
            </div>;

            console.dir(this.emailInput)

            this.form.onsubmit = this.submitRegistration;

            this.cancelBtn.onclick = this.props.close;

        return jsx;
    }
}

export default Registration;