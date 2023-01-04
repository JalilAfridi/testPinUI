import React, { useRef, useState, useEffect } from "react";

const PinInput = ({
  secret,
  length,
  onComplete,
  regex,
  placeholder,
  fancyUI
}) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);

    if (index === length - 1) {
      onComplete(newValues);
    } else {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (paste.length > 1) {
      const pastedValues = paste.split("").slice(0, length);
      setValues(pastedValues);
      inputRefs.current[pastedValues.length - 1].focus();
    } else if (paste.length === 1 && paste.match(regex)) {
      const newValues = [...values];
      newValues[index] = paste;
      setValues(newValues);
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: fancyUI
          ? "linear-gradient(to right, #00b8d4, #0052d4)"
          : "#fff"
      }}
    >
      {values.map((value, index) => (
        <input
          key={index}
          type={secret ? "password" : "text"}
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          placeholder={placeholder}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            margin: "0 5px",
            border: "none",
            borderRadius: "5px",
            background: fancyUI
              ? "linear-gradient(to bottom, #f2f2f2, #e6e6e6)"
              : "#fff",
            boxShadow: fancyUI ? "0 2px 3px rgba(0, 0, 0, 0.3)" : "none",
            fontSize: "20px",
            color: fancyUI ? "#333" : "#000",
            transition: "all 0.2s",
            ":focus": {
              background: fancyUI
                ? "linear-gradient(to bottom, #ffb3b3, #ff6666)"
                : "#fff",
              boxShadow: fancyUI
                ? "0 0 0 3px rgba(255, 100, 100, 0.5)"
                : "0 0 0 3px #999",
              outline: "none"
            },
            ":hover": {
              cursor: fancyUI ? "pointer" : "text",
              background: fancyUI
                ? "linear-gradient(to bottom, #ffcccc, #ff9999)"
                : "#fff"
            }
          }}
        />
      ))}
    </div>
  );
};

PinInput.defaultProps = {
  secret: false,
  length: 4,
  regex: /^\d$/,
  placeholder: "*",
  fancyUI: true
};

export default PinInput;
