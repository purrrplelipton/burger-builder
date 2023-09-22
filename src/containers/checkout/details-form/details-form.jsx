import { Button, Input, Loader } from "@components/ui";
import xs from "@src/xs";
import pt from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles, {
  contactDetailsWrapper,
  ctaWrapper,
  loaderWrapper,
  wrapper,
} from "./details-form.module.css";

function map(source) {
  const output = {};
  Object.keys(source).forEach((key) => {
    if (Object.hasOwnProperty.call(source[key], "value")) {
      output[key] = source[key].value;
    } else {
      output[key] = map(source[key]);
    }
  });
  return output;
}

const attributes = {
  name: {
    type: "text",
    placeholder: "Full Name",
    value: "",
    rules: { exp: /^[a-zA-Z]+[A-Za-z]+$/, required: true },
    valid: false,
  },
  email: {
    type: "email",
    placeholder: "Email",
    value: "",
    rules: { exp: /^\w@\w.\w/, required: true },
    valid: false,
  },
  address: {
    street: {
      type: "text",
      placeholder: "Street",
      value: "",
      rules: { exp: /^\d{1,3}[a-zA-Z]$/, required: true },
      valid: false,
    },
    "zip-code": {
      type: "text",
      placeholder: "ZIP Code",
      value: "",
      rules: { minLength: 6, maxLength: 6, required: true },
      valid: false,
    },
    region: {
      options: [
        { value: "AF", label: "Africa" },
        { value: "AN", label: "Antartica" },
        { value: "AS", label: "Asia" },
        { value: "AU", label: "Australia" },
        { value: "EU", label: "Europe" },
        { value: "NA", label: "North America" },
        { value: "SA", label: "South America" },
      ],
      value: "EU",
    },
  },
  "delivery-method": {
    options: [
      { value: "STD", label: "Standard" },
      { value: "EXP", label: "Express" },
    ],
    value: "STD",
  },
};

function DetailsForm({ total, contents }) {
  const [formStates, setFormStates] = useState({ loading: false, error: null });
  const [details, setDetails] = useState(attributes);
  const navigate = useNavigate();

  const placeOrder = (evt) => {
    evt.preventDefault();

    setFormStates((prv) => ({ ...prv, loading: true }));

    const customer = map(details);

    xs.post("/orders.json", {
      customer: {
        ...customer,
        address: {
          ...customer.address,
          "zip-code": parseInt(customer.address["zip-code"], 10),
        },
      },
      contents,
      total,
    })
      .then(() => {
        setDetails(attributes);
        navigate("/", { replace: true });
      })
      .catch((error) => setFormStates((prv) => ({ ...prv, error })))
      .finally(() => setFormStates((prv) => ({ ...prv, loading: false })));
  };

  function check(value, rules) {
    let validity = false;
    if (rules.required) validity = value.trim() !== "";
    if (rules.exp) {
      const { exp } = rules;
      validity = new RegExp(exp).test(value);
    }
    return validity;
  }

  function change(path, value) {
    if (path.length === 1) {
      setDetails((prv) => ({
        ...prv,
        [path[0]]: {
          ...prv[path[0]],
          value,
          valid: check(value, prv[path[0]].rules),
        },
      }));
      return;
    }
    const [key, ...subKeys] = path;
    if (subKeys[0] === subKeys[subKeys.length - 1]) {
      setDetails((prv) => ({
        ...prv,
        [key]: {
          ...prv[key],
          [subKeys[0]]: {
            ...prv[key][subKeys[0]],
            value,
            valid: check(value, prv[key][subKeys[0]].rules),
          },
        },
      }));
    } else {
      setDetails((prv) => ({
        ...prv,
        [key]: {
          ...prv[key],
          [subKeys[0]]: change(subKeys, value),
        },
      }));
    }

    console.log(details);
  }

  return (
    <section className={wrapper}>
      <h1>Provide your details to proceed</h1>
      <form onSubmit={placeOrder}>
        <Input
          id="full-name"
          variant="field"
          attributes={details.name}
          onChange={(event) => change(["name"], event.target.value)}
        />
        <Input
          id="email-address"
          variant="field"
          attributes={details.email}
          onChange={(event) => change(["email"], event.target.value)}
        />
        <fieldset className={contactDetailsWrapper}>
          <Input
            id="region"
            variant="dropdown"
            attributes={details.address.region}
            onChange={(event) => {
              change(["address", "region"], event.target.value);
            }}
            className={styles.fieldsetChild}
          />
          <Input
            id="zip-code"
            variant="field"
            attributes={details.address["zip-code"]}
            onChange={(event) => {
              change(["address", "zip-code"], event.target.value);
            }}
            className={styles.fieldsetChild}
          />
        </fieldset>
        <Input
          id="street-name"
          variant="field"
          attributes={details.address.street}
          onChange={(event) => {
            change(["address", "street"], event.target.value);
          }}
        />
        <Input
          id="delivery-method"
          variant="radios"
          attributes={details["delivery-method"]}
          onChange={(event) => change(["delivery-method"], event.target.value)}
        />
        <div className={ctaWrapper}>
          <Button variant="blue-grey" onClick={() => navigate(-1)}>
            CANCEL
          </Button>
          <Button variant="light-green" type="submit">
            PLACE ORDER
          </Button>
        </div>
      </form>
      {formStates.loading && (
        <i className={loaderWrapper}>
          <Loader>Hold tight while we process your order.</Loader>
        </i>
      )}
    </section>
  );
}

DetailsForm.propTypes = {
  total: pt.number.isRequired,
  contents: pt.shape({
    lettuce: pt.number.isRequired,
    bacon: pt.number.isRequired,
    cheese: pt.number.isRequired,
    tomato: pt.number.isRequired,
    "onion-ring": pt.number.isRequired,
    patty: pt.number.isRequired,
    pickles: pt.number.isRequired,
  }).isRequired,
};

export default DetailsForm;
