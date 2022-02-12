import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/hompage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckOutPage from "./pages/checkout/checkout.component";

import { checkUserSessions } from "./redux/user/user.actions";

const App = ({ checkUserSessions, currentUser }) => {

  useEffect(() => {
    checkUserSessions();
  }, [checkUserSessions]);

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
            currentUser ? (
              <Navigate replace to="/" />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSessions: () => dispatch(checkUserSessions()),
});

export default connect(null, mapDispatchToProps)(App);
