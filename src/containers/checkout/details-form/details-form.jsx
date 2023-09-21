import { Button, Input, Loader } from "@components/ui";
import xs from "@src/xs";
import pt from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  contactDetailsWrapper,
  ctaWrapper,
  loaderWrapper,
  wrapper,
} from "./details-form.module.css";

const attributes = {
  name: {
    type: "text",
    placeholder: "Full Name",
  },
  email: {
    type: "email",
    placeholder: "Email",
  },
  street: {
    type: "text",
    placeholder: "Street",
  },
  "zip-code": {
    type: "text",
    placeholder: "ZIP Code",
  },
  region: {
    options: [
      { value: "af", label: "Africa" },
      { value: "an", label: "Antartica" },
      { value: "as", label: "Asia" },
      { value: "au", label: "Australia" },
      { value: "eu", label: "Europe" },
      { value: "na", label: "North America" },
      { value: "sa", label: "South America" },
    ],
  },
  "delivery-method": { type: "radio", value: "std" },
};

function DetailsForm({ total, contents }) {
  const [formStates, setFormStates] = useState({ loading: false, error: null });
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: { region: "", street: "", "zip-code": "" },
  });
  const navigate = useNavigate();

  const placeOrder = (evt) => {
    evt.preventDefault();

    setFormStates((prv) => ({ ...prv, loading: true }));

    xs.post("/orders.json", { customer: details, contents, total })
      .then(() => {
        setDetails({
          name: "",
          email: "",
          address: { region: "na", street: "", "zip-code": "" },
        });
        navigate("/", { replace: true });
      })
      .catch((error) => setFormStates((prv) => ({ ...prv, error })))
      .finally(() => setFormStates((prv) => ({ ...prv, loading: false })));
  };

  return (
    <section className={wrapper}>
      <h1>Provide your details to proceed</h1>
      <form>
        <Input
          id="full-name"
          variant="input"
          attributes={attributes.name}
          value={details.name}
          onChange={(e) => {
            setDetails((prv) => ({
              ...prv,
              name: e.target.value,
            }));
          }}
        />
        <Input
          id="email-address"
          variant="input"
          attributes={attributes.email}
          value={details.email}
          onChange={(e) => {
            setDetails((prv) => ({ ...prv, email: e.target.value }));
          }}
        />
        <fieldset className={contactDetailsWrapper}>
          <Input
            id="region"
            variant="dropdown"
            attributes={attributes.region}
            value={details.address.region}
            onChange={(e) => {
              setDetails((prv) => ({
                ...prv,
                address: { ...prv.address, region: e.target.value },
              }));
            }}
          />
          <Input
            id="zip-code"
            variant="input"
            attributes={attributes["zip-code"]}
            value={details.address["zip-code"]}
            onChange={(e) => {
              setDetails((prv) => ({
                ...prv,
                address: { ...prv.address, "zip-code": e.target.value },
              }));
            }}
          />
        </fieldset>
        <Input
          id="street-name"
          variant="input"
          attributes={attributes.street}
          value={details.address.street}
          onChange={(e) => {
            setDetails((prv) => ({
              ...prv,
              address: { ...prv.address, street: e.target.value },
            }));
          }}
        />
        <div className={ctaWrapper}>
          <Button btnType="danger" onClick={() => navigate(-1)}>
            CANCEL
          </Button>
          <Button btnType="success" onClick={placeOrder}>
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
