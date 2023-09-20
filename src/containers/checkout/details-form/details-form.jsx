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

const initial = {
  name: "",
  email: "",
  address: { street: "", "zip-code": "" },
};

function DetailsForm({ total, contents }) {
  const [formStates, setFormStates] = useState({ loading: false, error: null });
  const [details, setDetails] = useState(initial);
  const navigate = useNavigate();

  const placeOrder = (evt) => {
    evt.preventDefault();

    setFormStates((prv) => ({ ...prv, loading: true }));

    xs.post("/orders.json", { customer: details, contents, total })
      .then(() => {
        setDetails(initial);
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
          id="name"
          type="text"
          placeholder="Full Name"
          value={details.name}
          onChange={(e) => {
            setDetails((prv) => ({ ...prv, name: e.target.value }));
          }}
        />
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={details.email}
          onChange={(e) => {
            setDetails((prv) => ({ ...prv, email: e.target.value }));
          }}
        />
        <fieldset className={contactDetailsWrapper}>
          <Input
            id="street"
            type="text"
            placeholder="Street"
            value={details.address.street}
            onChange={(e) => {
              setDetails((prv) => ({
                ...prv,
                address: { ...prv.address, street: e.target.value },
              }));
            }}
          />
          <Input
            id="zip-code"
            type="text"
            placeholder="Zip Code"
            value={details.address["zip-code"]}
            onChange={(e) => {
              setDetails((prv) => ({
                ...prv,
                address: { ...prv.address, "zip-code": e.target.value },
              }));
            }}
          />
        </fieldset>
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
