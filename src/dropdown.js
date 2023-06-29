import "./dropdown.css";
import React from "react";

const Option = (props) => {
  return (
    <>
      <button onClick={props.onClick} className="option">
        <p className="first">{props.combinedName}</p>
      </button>
    </>
  );
};

export default Option;
