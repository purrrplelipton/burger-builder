import pt from "prop-types";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./input.module.css";

function Input({ variant, id, value, onChange, ...rest }) {
  const [focused, setFocus] = useState(false);

  const input$cn = [
    styles.input,
    rest.className,
    focused || value ? styles.focused : "",
  ];

  let element = null;

  const defaults = {
    id,
    value,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    className: input$cn.join(" "),
    autoComplete: "off",
  };

  switch (variant) {
    case "input":
      element = <input {...defaults} />;
      break;

    case "textarea":
      element = <textarea {...defaults} />;
      break;

    case "dropdown":
      {
        const { options } = rest.attributes;
        const selected$option = options.find(
          (option) => option.value === value
        );
        const title$message = selected$option
          ? `"${selected$option.label}" region selected`
          : "Select a region";
        element = (
          <select title={title$message} {...defaults}>
            {options.map((option) => (
              <option key={uuidv4()} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }
      break;

    default:
      element = (
        <input
          id={id}
          value={value}
          onChange={onChange}
          className={input$cn.join(" ")}
        />
      );
      break;
  }

  return (
    <label htmlFor={id} className={styles.wrapper}>
      {element}
      {rest.attributes.placeholder && (
        <span className={styles.placeholder}>
          {rest.attributes.placeholder}
        </span>
      )}
      <i className={styles.indicator} />
    </label>
  );
}

Input.propTypes = {
  variant: pt.oneOf(["input", "textarea", "dropdown"]).isRequired,
  attributes: pt.shape({
    type(props, propName, componentName) {
      if (props.variant === "input" && !props[propName]) {
        return new Error(
          `The 'type' prop is required when the 'variant' is 'input' in ${componentName}.`
        );
      }
      return null; // Validation passed
    },
  }).isRequired,
  id: pt.string.isRequired,
  value: pt.oneOfType([pt.string, pt.number]).isRequired,
  onChange: pt.func.isRequired,
};

export default Input;
