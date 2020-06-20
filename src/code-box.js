import React from "react";

const CodeBox = ({ children }) => {
  return (
    <div className="code-picker">
      <div className="tab-pane" id="sample-scala">
        <pre className="hl code-box">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBox;
