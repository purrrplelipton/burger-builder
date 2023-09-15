import { Button } from "@components/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { wrapper } from "./details-form.module.css";

function DetailsForm({ checkout }) {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: { street: "", zip$code: "" },
  });

  return (
    <section className={wrapper}>
      <h1>Enter your detals to proceed</h1>
      <form>
        <input
          type="text"
          value={details.name}
          placeholder="John Doe"
          onChange={({ target: { value } }) => {
            setDetails((prv) => ({ ...prv, name: value }));
          }}
        />
        <input
          type="email"
          value={details.email}
          placeholder="johndoe@example.com"
          onChange={({ target: { value } }) => {
            setDetails((prv) => ({ ...prv, email: value }));
          }}
        />
        <input
          type="text"
          value={details.address.street}
          placeholder="Rodeo dr."
          onChange={({ target: { value } }) => {
            setDetails((prv) => ({
              ...prv,
              address: { ...prv.address, street: value },
            }));
          }}
        />
        <input
          type="text"
          value={details.address.zip$code}
          placeholder="4f9e2n"
          onChange={({ target: { value } }) => {
            setDetails((prv) => ({
              ...prv,
              address: { ...prv.address, zip$code: value },
            }));
          }}
        />
        <Button btnType="danger" onClick={() => navigate(-1)}>
          CANCEL
        </Button>
        <Button btnType="success" onClick={checkout}>
          PLACE ORDER
        </Button>
      </form>
    </section>
  );
}

DetailsForm.propTypes = { checkout: PropTypes.func.isRequired };

export default DetailsForm;
