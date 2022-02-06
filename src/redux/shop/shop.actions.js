import {
    ShopActionTypes
} from './shop.types';

// import {
//     firestore,
//     collection,
//     getDocs,
//     convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => async () => {
        // const collectionRef = collection(firestore, "collections");
        // dispatch(fetchCollectionsStart());

        // try {
        //     const snapshot = await getDocs(collectionRef);
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionsSuccess(collectionsMap));
        // } catch (error) {
        //     dispatch(fetchCollectionsFailure(error.message));
        // }
    }
}