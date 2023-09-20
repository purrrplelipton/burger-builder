import pt from "prop-types";
import React, { useState } from "react";
import styles from "./input.module.css";

function Input(props) {
  const [focused, setFocus] = useState(false);
  const { type, id, value, placeholder, onChange } = props;

  const handle$focus = () => {
    setFocus(true);
  };

  const handle$blur = () => {
    setFocus(false);
  };

  const input$cn = [styles.input, focused || value ? styles.focused : ""];

  return (
    <label htmlFor={id} className={styles.wrapper}>
      <input
        onFocus={handle$focus}
        onBlur={handle$blur}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={input$cn.join(" ")}
      />
      <span className={styles.placeholder}>{placeholder}</span>
      <i className={styles.indicator} />
    </label>
  );
}

Input.propTypes = {
  type: pt.oneOf(["text", "email", "password", "button"]).isRequired,
  id: pt.string.isRequired,
  placeholder: pt.string.isRequired,
  value: pt.oneOfType([pt.string, pt.number]).isRequired,
  onChange: pt.func.isRequired,
};

export default Input;
