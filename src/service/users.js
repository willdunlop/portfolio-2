import db from './db';

const users = {

    get: () => {},

    post: data => {
        firebase.firestore().collection("users").add({
            uid: data.uid,
            name: data.name,
            email: data.email,
        }).then(res => {
            console.log("document written with response: ", res);
        }).catch(err => {
            console.log("An error occured when posting user: ", err)
        })
    }

}

export default users;