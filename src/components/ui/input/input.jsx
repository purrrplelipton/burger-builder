import { AlertSquareRounded } from "@src/assets/vectors";
import pt from "prop-types";
import React, { memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./input.module.css";

function Input({ variant, id, onChange, ...rest }) {
  const { value, valid, rules } = rest.attributes;
  const [fieldFocused, setFieldFocus] = useState(false);
  const [dropdownFocused, setDropdownFocus] = useState(false);

  const classNames = {
    wrapper: [styles.wrapper, rest.className],
    field: [
      styles.element,
      fieldFocused || value ? styles.focused : "",
      valid && value ? "" : styles.invalid,
    ],
    dropdown: [styles.element, dropdownFocused ? styles.focused : ""],
    indicator: [styles.alertsIndicator],
  };

  let element = null;

  const defaults = {
    id,
    value,
    onChange,
    onFocus: () => setFieldFocus(true),
    onBlur: () => setFieldFocus(false),
    className: classNames.field.join(" "),
    autoComplete: "off",
    "aria-invalid": !valid,
    "aria-required": rules.required,
  };

  switch (variant) {
    case "field":
      {
        const { type } = rest.attributes;
        element = <input {...defaults} type={type} />;
      }
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
        const label = selected$option
          ? `Region selected: ${selected$option.label}`
          : "Select a region";
        const dropdownDefaults = {
          ...defaults,
          className: classNames.dropdown.join(" "),
          onFocus: () => setDropdownFocus(true),
          onBlur: () => setDropdownFocus(false),
        };

        element = (
          <select aria-label={label} {...dropdownDefaults}>
            {options.map((option) => (
              <option key={uuidv4()} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }
      break;

    case "radios":
      {
        const { options } = rest.attributes;

        element = (
          <fieldset className={styles.radioFieldset}>
            {options.map((option) => (
              <label
                key={uuidv4()}
                htmlFor={option.value}
                className={styles.radio}
              >
                <input
                  name={id}
                  type="radio"
                  id={option.value}
                  value={option.value}
                  checked={option.value === value}
                  onChange={onChange}
                />
                <span className={styles.radioOptionLabel}>{option.label}</span>
                <i className={styles.radioOptionIndicator} />
              </label>
            ))}
          </fieldset>
        );
      }
      break;

    default:
      {
        const { type } = rest.attributes;

        element = (
          <input
            type={type || "text"}
            id={id || null}
            value={value || ""}
            onChange={onChange || (() => {})}
            className={classNames.field.join(" ")}
          />
        );
      }
      break;
  }

  return (
    <label htmlFor={id} className={classNames.wrapper.join(" ")}>
      {element}
      {rest.attributes.placeholder && (
        <span className={styles.placeholder}>
          {rest.attributes.placeholder}
        </span>
      )}
      <i className={styles.indicator} />
      <i className={classNames.indicator.join(" ")}>
        {!valid && <AlertSquareRounded />}
      </i>
    </label>
  );
}

Input.propTypes = {
  variant: pt.oneOf(["field", "textarea", "dropdown", "radios"]).isRequired,
  attributes: pt.shape({
    type: pt.oneOf(["text", "email", "password"]).isRequired,
    value: pt.oneOfType([pt.string, pt.number]).isRequired,
  }).isRequired,
  id: pt.string.isRequired,
  onChange: pt.func.isRequired,
};

export default memo(Input);
