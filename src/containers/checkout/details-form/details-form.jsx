import { Button } from "@components/ui";
import React, {
  // useEffect,
  useState,
} from "react";
import {
  // useLocation,
  useNavigate,
} from "react-router-dom";
import {
  base,
  contactDetailsWrapper,
  indicator,
  inputWrapper,
  wrapper,
} from "./details-form.module.css";

function DetailsForm() {
  const navigate = useNavigate();
  // const location = useLocation();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: { street: "", zip$code: "" },
  });

  // useEffect(() => {}, [location]);

  const placeOrder = () => {};

  return (
    <section className={wrapper}>
      <h1>Provide your details to proceed</h1>
      <form>
        <div className={inputWrapper}>
          <input
            className={`${base}`}
            id="name"
            type="text"
            value={details.name}
            onChange={({ target: { value } }) => {
              setDetails((prv) => ({ ...prv, name: value }));
            }}
          />
          <label htmlFor="name">Name</label>
          <i className={indicator} />
        </div>
        <div className={inputWrapper}>
          <input
            className={`${base}`}
            id="email"
            type="email"
            value={details.email}
            onChange={({ target: { value } }) => {
              setDetails((prv) => ({ ...prv, email: value }));
            }}
          />
          <label htmlFor="email">Email</label>
          <i className={indicator} />
        </div>
        <fieldset className={contactDetailsWrapper}>
          <div className={inputWrapper}>
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
            <label htmlFor="street">Street</label>
            <i className={indicator} />
          </div>
          <div className={inputWrapper}>
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
            <label htmlFor="zipcode">Zip Code</label>
            <i className={indicator} />
          </div>
        </fieldset>
        <div className={inputWrapper}>
          <Button btnType="danger" onClick={() => navigate(-1)}>
            CANCEL
          </Button>
          <Button btnType="success" onClick={placeOrder}>
            PLACE ORDER
          </Button>
        </div>
      </form>
    </section>
  );
}

export default DetailsForm;
