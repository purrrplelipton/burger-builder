import CheckoutSummary from "@components/order/checkout-summary";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState({
    lettuce: 1,
    bacon: 1,
    cheese: 1,
    tomato: 1,
    patty: 1,
    pickles: 1,
    "onion-rings": 1,
  });

  return (
    <CheckoutSummary
      ingredients={ingredients}
      proceed={() => navigate("/checkout/details", { replace: true })}
      cancel={() => navigate(-1)}
    />
  );
}

export default Checkout;
