import React from "react";

const Step = ({ number, children }) => {
  return (
    <article className="card-docs">
      <i className="card-docs-icon icon-budicon-499 orange" />
      <h2 className="card-docs-title">Step {number}</h2>
      {children}
    </article>
  );
};

export default Step;
