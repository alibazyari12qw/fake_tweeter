import React from "react";

const Title = ({ children, className }) => {
  return <h1 className={`text-4xl ${className}`}>{children}</h1>;
};

export default Title;
