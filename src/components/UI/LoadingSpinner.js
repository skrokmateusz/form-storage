import React from "react";

const LoadingSpinner = props => {
  return (
    <div className={`${props.classNameContainer}`}>
      <div className={`${props.classNameSpinner}`}></div>
    </div>
  );
}

export default LoadingSpinner