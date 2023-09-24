import CheckoutSummary from "@components/order/checkout-summary/checkout-summary";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DetailsForm from "./details-form/details-form";

function Checkout() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="details" element={<DetailsForm />} />
      <Route
        index
        element={
          <CheckoutSummary
            cancel={() => navigate(-1)}
            proceed={() => navigate("details")}
          />
        }
      />
    </Routes>
  );
}

export default Checkout;
