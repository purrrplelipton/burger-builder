import CheckoutSummary from "@components/order/checkout-summary/checkout-summary";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DetailsForm from "./details-form/details-form";

function Checkout() {
  const [totalPrice, setTotalPrice] = useState(null);
  const [contents, setContents] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location) {
      const { state } = location;
      if (state) {
        const { ingredients, total } = state;
        setContents(ingredients);
        setTotalPrice(total);
      }
    }
  }, [location]);

  const goBack = () => navigate(-1);
  function provideDetails() {
    navigate("details", {
      state: { ingredients: contents, total: totalPrice },
    });
  }

  return (
    contents &&
    totalPrice && (
      <Routes>
        <Route
          path="details"
          element={<DetailsForm total={totalPrice} contents={contents} />}
        />
        <Route
          index
          element={
            <CheckoutSummary
              ingredients={contents}
              cancel={goBack}
              proceed={provideDetails}
            />
          }
        />
      </Routes>
    )
  );
}

export default Checkout;
