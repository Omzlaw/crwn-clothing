import React from "react";

import StripeCheckout from "react-stripe-checkout";


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KF0oGIy7F1gokuWH2cCXwMb3VpjtQmhzCD81VJogUxLA24mKoWGOTyPiksgU4ri4qz2aROzcNK1ZsTEjTavDCaY00i9YrWxlG';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return <StripeCheckout 
    
        label="Pay Now"
        name="CRWN Clothing Ltd."
        amount={priceForStripe}
        stripeKey={publishableKey}
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        description={`Your Total is ${price}`}
        panelLabel="Pay Now"
        token={onToken}
    />
}

export default StripeCheckoutButton;