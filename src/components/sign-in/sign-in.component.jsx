import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";
import {signInWithGoogle, auth, signInWithEmailAndPassword} from "../../firebase/firebase.utils";


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {email, password} = this.state;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.setState({
          email: '',
          password: ''
        })
      })
      .catch((error) => {
        return error
      });
    } catch (error) {
      
    }
  };

  handleChange = (event) => {
      const {value, name} = event.target;

      this.setState({[name]: value})
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with yor email and password</span>

        <form action="" onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
          />

          <div className="buttons">
            <CustomButton type="submit" >Sgn In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
          </div>


        </form>
      </div>
    );
  }
}

export default SignIn;
