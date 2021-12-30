import React from "react";
import { Route, Routes } from "react-router-dom";
import {connect} from 'react-redux';
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/hompage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {
  auth,
  createUserProfileDocument,
  onSnapshot,
} from "./firebase/firebase.utils";

import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  unSubscibeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;

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
        setCurrentUser({
          userAuth,
        });
      }
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
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
          <Route path="/signin" element={<SignInAndSignUpPage />}></Route>
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
