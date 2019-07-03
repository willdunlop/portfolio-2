// import users from './users';

// const service = {
//     users,
// };

// export default service;

// import axios from 'axios';

import helpers from '../config/helpers';
import constants from '../config/constants';

class ApiService {
    constructor() {

        this.db = firebase.firestore();
        this.db.settings({ timestampsInSnapshots: true });

        this.function = firebase.functions();

    }

    callFS(httpMethod, collection, options) {
        return new Promise((resolve, reject) => {
            switch (httpMethod) {
                case 'get':
                this.db.collection(collection).get(options)
                    .then(res => {
                        console.log("data was retrieved", res);
                        resolve(/*res*/)
                    }).catch(err => {
                        console.log("Error occured", err)
                        reject()
                    })
                break;

                case 'post':
                this.db.collection(collection).add(options).then(res => {
                    console.log("document written with response: ", res);
                    resolve()
                }).catch(err => {
                    console.log("An error occured when posting user: ", err);
                    reject();
                })
                break;

                case 'put':
                reject("Under Construction");
                break;

                case 'delete':
                reject("Under Construction");
                break;

                default:
                reject("Not a recognised http method. Try 'get', 'post', 'put' or 'delete'");
                break;
            }
        })
    }

}

export default ApiService;