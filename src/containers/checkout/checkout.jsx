import CheckoutSummary from "@components/order/checkout-summary";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DetailsForm from "./details-form";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const cns = {};
    query.forEach((val, key) => {
      if (parseInt(val, 10)) cns[key] = +val;
      else cns[key] = 0;
    });
    setIngredients(cns);
  }, [location.search]);

  return (
    ingredients && (
      <Routes>
        <Route
          path="/checkout/details"
          element={<DetailsForm checkout={() => {}} />}
        />
        <Route
          path="/checkout"
          element={
            <CheckoutSummary
              ingredients={ingredients}
              proceed={() => navigate("/checkout/details", { replace: true })}
              cancel={() => navigate(-1)}
            />
          }
        />
      </Routes>
    )
  );
}

export default Checkout;
