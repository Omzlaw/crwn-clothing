// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import {
    getFirestore,
    getDoc,
    doc,
    onSnapshot,
    setDoc,
    writeBatch,
    collection,
    getDocs
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8G_xr7ypt7_AzI7b0JOfPGiC8c00ko6k",
    authDomain: "crwn-db-68427.firebaseapp.com",
    projectId: "crwn-db-68427",
    storageBucket: "crwn-db-68427.appspot.com",
    messagingSenderId: "141668668480",
    appId: "1:141668668480:web:7a987a464750850495fba5",
    measurementId: "G-99KXMX4PDK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    // prompt: 'select account'
});

export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) {
        return;
    }


    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const snapshot = await getDoc(userRef);


    if (!snapshot.exists()) {
        const {
            displayName,
            email
        } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }


    return userRef;
}


export {onSnapshot, createUserWithEmailAndPassword, signInWithEmailAndPassword};

export {collection, getDocs}

export const signInWithGoogle = () => signInWithPopup(auth, provider)
    .then((result) => {
        return result;
    }).catch((error) => {
        return error;
    });

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const batch = writeBatch(firestore);

     objectsToAdd.forEach(obj => {
        const newDocRef = doc(firestore, collectionKey, obj.title)
        batch.set(newDocRef, obj)
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});

}

export default app;