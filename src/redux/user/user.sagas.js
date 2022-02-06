import {
    takeLatest,
    put,
    all,
    call
} from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
    signInWithGoogle,
    createUserProfileDocument,
    signInWithEmailAndPassword,
    auth
} from "../../firebase/firebase.utils";

import {
    signInSuccess,
    signInFailure
} from "./user.actions";

export function* getSnapshotFromUserAuth(user) {
    const {
        snapshot
    } = yield call(createUserProfileDocument, user);

    yield put(signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
    }));
}

export function* signInWithGoogleGen() {
    try {
        const {
            user
        } = yield signInWithGoogle();
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        yield put(signInFailure(error));
    }

}

export function* signInWithEmailGen({
    payload: {
        email,
        password
    }
}) {
    try {
        const {
            user
        } = yield signInWithEmailAndPassword(auth, email, password);
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogleGen);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailGen);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}