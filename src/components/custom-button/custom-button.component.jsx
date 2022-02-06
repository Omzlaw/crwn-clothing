import React from "react";

// import './custom-button.styles.scss';
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = (props) => {
  return <CustomButtonContainer {...props}></CustomButtonContainer>;
};

export default CustomButton;
