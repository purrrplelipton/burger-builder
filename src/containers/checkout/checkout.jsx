import CheckoutSummary from "@components/order/checkout-summary";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DetailsForm from "./details-form";

const tmp = {
  lettuce: 1,
  bacon: 1,
  tomato: 1,
  cheese: 1,
  pickles: 1,
  patty: 1,
  "onion-rings": 1,
};

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    if (location && location.state && location.state.ingredients) {
      setIngredients(location.state.ingredients);
      return () => {};
    }
    setIngredients(null);
    return () => {};
  }, [location]);

  return (
    ingredients && (
      <Routes>
        <Route path="/checkout">
          <Route
            index
            element={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <CheckoutSummary
                ingredients={ingredients}
                proceed={() => navigate("details", { replace: true })}
                cancel={() => navigate(-1)}
              />
            }
          />
          <Route path="details" element={<DetailsForm checkout={() => {}} />} />
        </Route>
      </Routes>
    )
  );
}

export default Checkout;
