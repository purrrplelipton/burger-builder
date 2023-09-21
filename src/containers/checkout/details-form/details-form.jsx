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

const attributes = {
  name: {
    value: "",
    type: "text",
    placeholder: "Full Name",
  },
  email: {
    value: "",
    type: "email",
    placeholder: "Email",
  },
  address: {
    street: {
      value: "",
      type: "text",
      placeholder: "Street",
    },
    "zip-code": {
      value: "",
      type: "text",
      placeholder: "ZIP Code",
    },
    region: {
      value: "EU",
      options: [
        { value: "AF", label: "Africa" },
        { value: "AN", label: "Antartica" },
        { value: "AS", label: "Asia" },
        { value: "AU", label: "Australia" },
        { value: "EU", label: "Europe" },
        { value: "NA", label: "North America" },
        { value: "SA", label: "South America" },
      ],
    },
  },
  "delivery-method": {
    value: "STD",
    options: [
      { value: "STD", label: "Standard" },
      { value: "EXP", label: "Express" },
    ],
  },
};

function DetailsForm({ total, contents }) {
  const [formStates, setFormStates] = useState({ loading: false, error: null });
  const [details, setDetails] = useState(attributes);
  const navigate = useNavigate();

  const placeOrder = (evt) => {
    evt.preventDefault();

    setFormStates((prv) => ({ ...prv, loading: true }));

    const customer = {
      name: details.name.value,
      email: details.email.value,
      address: {
        region: details.address.region.value,
        "zip-code": details.address["zip-code"].value,
        street: details.address.street.value,
      },
      "delivery-method": details["delivery-method"].value,
    };

    xs.post("/orders.json", { customer, contents, total })
      .then(() => {
        setDetails(attributes);
        navigate("/", { replace: true });
      })
      .catch((error) => setFormStates((prv) => ({ ...prv, error })))
      .finally(() => setFormStates((prv) => ({ ...prv, loading: false })));
  };

  function change(path, value) {
    if (path.length === 1) {
      setDetails((prv) => ({ ...prv, [path[0]]: { ...prv[path[0]], value } }));
      return;
    }
    const [context, ...subContext] = path;
    setDetails((prv) => ({
      ...prv,
      [context]: {
        ...prv[context],
        [subContext[0]]:
          subContext[0] === subContext[subContext.length - 1]
            ? { ...prv[context][subContext[0]], value }
            : change(subContext, value),
      },
    }));
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
