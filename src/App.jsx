import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/hompage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckOutPage from "./pages/checkout/checkout.component";
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
  onSnapshot,
} from "./firebase/firebase.utils";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { setCurrentUser } from "./redux/user/user.actions";
import {selectCollectionsForPreview} from './redux/shop/shop.selectors';
class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  unSubscibeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;

    this.unSubscibeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (doc) => {
          setCurrentUser({
            id: doc.id,
            ...doc.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})) )
    });
  }

  componentWillUnmount() {
    this.unSubscibeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/shop/*" element={<ShopPage />}></Route>
          <Route path="/checkout" element={<CheckOutPage />}></Route>
          <Route
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate replace to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          ></Route>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
