import React from "react";
import { connect } from "react-redux";

import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {toggleCartHidden} from '../../redux/cart/cart.actions';

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, router, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-meesage">Your cart is empty</span>
      )}
    </div>
    <CustomButton onClick={() => {router.navigate('/checkout'); dispatch(toggleCartHidden())}}>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default withRouter(connect(mapStateToProps)(CartDropdown));
