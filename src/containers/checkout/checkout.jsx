import CheckoutSummary from "@components/order/checkout-summary";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      <CheckoutSummary
        ingredients={ingredients}
        proceed={() => navigate("/checkout/details", { replace: true })}
        cancel={() => navigate(-1)}
      />
    )
  );
}

export default Checkout;
