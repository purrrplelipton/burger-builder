import CheckoutSummary from "@components/order/checkout-summary";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DetailsForm from "./details-form";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    if (location && location.state && location.state.ingredients) {
      setIngredients(location.state.ingredients);
    } else {
      setIngredients(null);
    }
  }, [location]);

  return (
    ingredients && (
      <Routes>
        <Route
          path="/checkout/*"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <CheckoutSummary
              ingredients={ingredients}
              proceed={() => navigate("details", { replace: true })}
              cancel={() => navigate(-1)}
            >
              <Route
                path="details"
                element={<DetailsForm checkout={() => {}} />}
              />
            </CheckoutSummary>
          }
        />
      </Routes>
    )
  );
}

export default Checkout;
