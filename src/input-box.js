import React from "react";

const InputBox = ({ onInputChange }) => {
  return (
    <div className="code-picker">
      <div className="tab-pane" id="sample-scala">
        <textarea
          rows={6}
          onChange={onInputChange}
          className="form-control input-box"
          placeholder="Placeholder text for input."
        />
      </div>
    </div>
  );
};

export default InputBox;
