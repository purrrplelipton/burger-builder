import { Button, Input, Loader } from "@components/ui";
import { changeHandler, objectMapper, valuesMapper } from "@components/utils";
import xs from "@src/xs";
import { number, shape } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./details-form.module.css";

const attributes = {
  name: {
    type: "text",
    placeholder: "Full Name",
    value: "",
    rules: {
      required: true,
      minLength: 3,
      exp: /^([A-Za-z]+)(\s[A-Za-z]+)?(\s[A-Za-z]+)?$/,
    },
    valid: false,
  },
  email: {
    type: "email",
    placeholder: "Email",
    value: "",
    rules: {
      required: true,
      minLength: 6,
      maxLength: 256,
      exp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    valid: false,
  },
  address: {
    street: {
      type: "text",
      placeholder: "Street",
      value: "",
      rules: {
        required: true,
        minLength: 3,
        exp: /^\d{1,3}(?:,\s)?[A-Za-z0-9\s]+$/,
      },
      valid: false,
    },
    "zip-code": {
      type: "text",
      placeholder: "ZIP Code",
      value: "",
      rules: {
        required: true,
        minLength: 5,
        maxLength: 5,
        exp: /^\d{5}$/,
      },
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
      valid: true,
      rules: { required: true },
    },
  },
  "delivery-method": {
    options: [
      { value: "STD", label: "Standard" },
      { value: "EXP", label: "Express" },
    ],
    value: "STD",
    valid: true,
    rules: { required: true },
  },
};

function DetailsForm({ contents, total }) {
  const [formStates, setFormStates] = useState({
    submittable: false,
    loading: false,
    error: null,
  });
  const [details, setDetails] = useState(attributes);
  const navigate = useNavigate();

  const placeOrder = (event) => {
    event.preventDefault();
    if (!formStates.submittable) return;
    setFormStates((prv) => ({ ...prv, loading: true }));
    xs.post("/orders.json", {
      customer: objectMapper(details, "value"),
      contents,
      total,
    })
      .then(() => {
        setDetails(attributes);
        navigate("/orders", { replace: true });
      })
      .catch((error) => setFormStates((prv) => ({ ...prv, error })))
      .finally(() => setFormStates((prv) => ({ ...prv, loading: false })));
  };

  useEffect(() => {
    const validities = objectMapper(details, "valid");
    const validitiesArray = valuesMapper(validities);
    setFormStates((prv) => ({
      ...prv,
      submittable: validitiesArray.every((validity) => validity === true),
    }));
  }, [details]);

  return (
    <section className={styles.wrapper}>
      <h1>Provide your details to proceed</h1>
      <form onSubmit={placeOrder}>
        <Input
          id="full-name"
          variant="field"
          attributes={details.name}
          onChange={(event) => {
            changeHandler(["name"], setDetails, event.target.value);
          }}
        />
        <Input
          id="email-address"
          variant="field"
          attributes={details.email}
          onChange={(event) => {
            changeHandler(["email"], setDetails, event.target.value);
          }}
        />
        <fieldset className={styles.contactDetailsWrapper}>
          <Input
            id="region"
            variant="dropdown"
            attributes={details.address.region}
            onChange={(event) => {
              changeHandler(
                ["address", "region"],
                setDetails,
                event.target.value
              );
            }}
            className={styles.fieldsetChild}
          />
          <Input
            id="zip-code"
            variant="field"
            attributes={details.address["zip-code"]}
            onChange={(event) => {
              changeHandler(
                ["address", "zip-code"],
                setDetails,
                event.target.value
              );
            }}
            className={styles.fieldsetChild}
          />
        </fieldset>
        <Input
          id="street-name"
          variant="field"
          attributes={details.address.street}
          onChange={(event) => {
            changeHandler(
              ["address", "street"],
              setDetails,
              event.target.value
            );
          }}
        />
        <Input
          id="delivery-method"
          variant="radios"
          attributes={details["delivery-method"]}
          onChange={(event) => {
            changeHandler(["delivery-method"], setDetails, event.target.value);
          }}
        />
        <div className={styles.ctaWrapper}>
          <Button
            variant="blue-grey"
            type="reset"
            onClick={() => {
              setDetails(attributes);
              navigate(-1);
            }}
          >
            CANCEL
          </Button>
          <Button
            disabled={!formStates.submittable}
            variant="light-green"
            type="submit"
          >
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
  total: number.isRequired,
  contents: shape({
    lettuce: number.isRequired,
    bacon: number.isRequired,
    cheese: number.isRequired,
    tomato: number.isRequired,
    "onion-ring": number.isRequired,
    patty: number.isRequired,
    pickles: number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { contents, total } = state.contents;
  return { contents, total };
};

export default connect(mapStateToProps)(DetailsForm);
