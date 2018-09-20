// Firebase
import * as admin from 'firebase-admin'
import 'firebase/auth'

let serviceAccount = require('../../serviceAccount.json')

export const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://groceries-app-c82b2.firebaseio.com'
})

// export default firebase.initializeApp({
//     apiKey: 'AIzaSyDCTBFe1rD1oOe5SMv-ZsOTC5Gofq_tLKU',
//     authDomain: 'groceries-app-c82b2.firebaseapp.com',
//     databaseURL: 'https://groceries-app-c82b2.firebaseio.com',
//     projectId: 'groceries-app-c82b2',
//     storageBucket: 'groceries-app-c82b2.appspot.com',
//     messagingSenderId: '846750448866'
// })
//
export const databaseRef = firebase.database().ref()
export const auth  = firebase.auth()
