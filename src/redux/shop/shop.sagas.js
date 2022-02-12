import {
    takeEvery,
    call,
    put,
    takeLatest,
    all
} from 'redux-saga/effects';

import {
    firestore,
    collection,
    getDocs,
    convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollections() {

    const collectionRef = collection(firestore, "collections");

    try {
        const snapshot = yield getDocs(collectionRef);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));

    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollections);
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart), ])
}