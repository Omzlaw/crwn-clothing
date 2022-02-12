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
    auth,
    getCurrentUser,
    createUserWithEmailAndPassword
} from "../../firebase/firebase.utils";

import {
    signInSuccess,
    signOutSuccess,
    signInFailure,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from "./user.actions";

export function* getSnapshotFromUserAuth(user, additionalData) {
    const {
        snapshot
    } = yield call(createUserProfileDocument, user, additionalData);

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

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess);
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({
    payload: {
        displayName,
        email,
        password,
    }
}) {

    try {
        const {
            user
        } = yield createUserWithEmailAndPassword(auth, email, password);
        yield put(signUpSuccess({
            user: user,
            additionalData: {
                displayName
            }
        }));

    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({
    payload: {
        user,
        additionalData
    }
}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogleGen);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailGen);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess)]);
}