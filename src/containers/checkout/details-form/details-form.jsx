import { Button, Loader } from "@components/ui";
import axios from "@src/axios";
import pt from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles, {
  base,
  contactDetailsWrapper,
  indicator,
  inputWrapper,
  placeholder,
  wrapper,
} from "./details-form.module.css";

function DetailsForm({ total, contents }) {
  const [formStates, setFormStates] = useState({ loading: false, error: null });
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: { street: "", zip$code: "" },
  });
  const navigate = useNavigate();

  const placeOrder = (evt) => {
    evt.preventDefault();

    setFormStates((prv) => ({ ...prv, loading: true }));

    axios
      .post("/orders.json", { contents, total, customer: details })
      .then(() => console.log("done"))
      .catch((error) => setFormStates((prv) => ({ ...prv, error })))
      .finally(() => setFormStates((prv) => ({ ...prv, loading: false })));
  };

  return (
    <section className={wrapper}>
      <h1>Provide your details to proceed</h1>
      <form>
        <label htmlFor="name" className={inputWrapper}>
          <input
            className={`${base}`}
            id="name"
            type="text"
            value={details.name}
            onChange={({ target: { value } }) => {
              setDetails((prv) => ({ ...prv, name: value }));
            }}
          />
          <span className={placeholder}>Full Name</span>
          <i className={indicator} />
        </label>
        <label htmlFor="email" className={inputWrapper}>
          <input
            className={`${base}`}
            id="email"
            type="email"
            value={details.email}
            onChange={({ target: { value } }) => {
              setDetails((prv) => ({ ...prv, email: value }));
            }}
          />
          <span className={placeholder}>Email</span>
          <i className={indicator} />
        </label>
        <fieldset className={contactDetailsWrapper}>
          <label htmlFor="street" className={inputWrapper}>
            <input
              className={`${base}`}
              id="street"
              type="text"
              value={details.address.street}
              onChange={({ target: { value } }) => {
                setDetails((prv) => ({
                  ...prv,
                  address: { ...prv.address, street: value },
                }));
              }}
            />
            <span className={placeholder}>Street</span>
            <i className={indicator} />
          </label>
          <label htmlFor="zipcode" className={inputWrapper}>
            <input
              className={`${base}`}
              id="zipcode"
              type="text"
              value={details.address.zip$code}
              onChange={({ target: { value } }) => {
                setDetails((prv) => ({
                  ...prv,
                  address: { ...prv.address, zip$code: value },
                }));
              }}
            />
            <span className={placeholder}>Zip Code</span>
            <i className={indicator} />
          </label>
        </fieldset>
        <div className={styles.ctaWrapper}>
          <Button btnType="danger" onClick={() => navigate(-1)}>
            CANCEL
          </Button>
          <Button btnType="success" onClick={placeOrder}>
            PLACE ORDER
          </Button>
        </div>
      </form>
      {formStates.loading && (
        <i className={styles.loaderWrapper}>
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
