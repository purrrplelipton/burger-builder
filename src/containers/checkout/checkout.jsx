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

  let UI = (
    <section style={{ margin: "auto", textAlign: "center" }}>
      <h1 style={{ marginBlockEnd: "1em" }}>
        You can&rsquo;t checkout right now!
      </h1>
      <p>You have no content in your burger buns.</p>
      <button
        style={{ marginBlockStart: "1em" }}
        type="button"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </section>
  );

  if (ingredients) {
    UI = (
      <CheckoutSummary
        ingredients={ingredients}
        proceed={() => navigate("/checkout/details", { replace: true })}
        cancel={() => navigate(-1)}
      />
    );
  }

  return UI;
}

export default Checkout;
