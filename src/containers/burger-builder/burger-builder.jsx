/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
import { BuildControls, Burger, OrderSummary } from "@components/burger";
import { Loader, Modal } from "@components/ui";
import axios from "@src/axios";
import ErrorHandler from "@src/hoc/error-handler";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CONTENT_PRICES = {
  lettuce: 50,
  bacon: 200,
  cheese: 100,
  "onion-ring": 100,
  pickles: 50,
  patty: 300,
  tomato: 50,
};

function BurgerBuilder() {
  const navigate = useNavigate();
  const [pageStates, setPageStates] = useState({
    ingredients: null,
    price: 100,
    "can-purchase": false,
    purchasing: false,
    loading: false,
    error: null,
  });

  useEffect(() => {
    axios
      .get("/ingredients.json")
      .then(({ data }) => {
        setPageStates((prv) => ({ ...prv, ingredients: data }));
        /* // */
        let base$price = pageStates.price;
        const contents = { ...data };
        Object.keys(contents).forEach((cn) => {
          if (contents[cn] > 0) {
            for (let i = 0; i < contents[cn]; i++) {
              base$price += CONTENT_PRICES[cn];
            }
            /* // */
            setPageStates((prv) => ({ ...prv, price: base$price }));
          }
        });
        const contentValues = Object.values(contents);
        let current$items = 0;
        for (let i = 0; i < contentValues.length; i++) {
          current$items += contentValues[i];
        }
        /* // */
        setPageStates((prv) => ({ ...prv, "can-purchase": current$items > 0 }));
      })
      .catch((error) => setPageStates((prv) => ({ ...prv, error })));
    return () => {};
  }, []);

  const updatePurchaseState = (contents) => {
    const reducer = (prev, curr) => prev + curr;
    const totalContents = Object.values(contents).reduce(reducer, 0);
    setPageStates((prv) => ({ ...prv, "can-purchase": totalContents > 0 }));
  };

  const checkout = () => {
    // setPageStates((prv) => ({ ...prv, loading: true });

    // const order = {
    //   contents: pageStates.ingredients,
    //   price: pageStates.price.toFixed(2),
    //   customer: {
    //     name: "Maximus Elrond",
    //     address: {
    //       street: "TestStreet 1",
    //       "zip-code": "41351",
    //       country: "Germany",
    //     },
    //     email: "test@test.com",
    //     "delivery-method": "fastest",
    //   },
    // };

    // instance
    //   .post("/orders.json", order)
    //   .finally(() => setPageStates((prv) => ({ ...prv, loading: false, purchasing: false }));

    navigate("/checkout", {
      replace: true,
      state: { ingredients: pageStates.ingredients },
    });
  };

  const addContent = (type) => {
    const updatedContents = { ...pageStates.ingredients };
    updatedContents[type] = pageStates.ingredients[type] + 1;

    const updatedPrice = pageStates.price + CONTENT_PRICES[type];
    setPageStates((prv) => ({
      ...prv,
      ingredients: updatedContents,
      price: updatedPrice,
    }));
    updatePurchaseState(updatedContents);
  };

  const removeContent = (type) => {
    const updatedContents = { ...pageStates.ingredients };
    if (pageStates.ingredients[type] < 1) {
      updatedContents[type] = pageStates.ingredients[type] - 0;
    } else updatedContents[type] = pageStates.ingredients[type] - 1;

    const updatedPrice = pageStates.price - CONTENT_PRICES[type];
    setPageStates((prv) => ({
      ...prv,
      ingredients: updatedContents,
      price: updatedPrice,
    }));
    updatePurchaseState(updatedContents);
  };

  let disabledInfo = null;

  if (pageStates.ingredients) {
    disabledInfo = { ...pageStates.ingredients };
    Object.keys(disabledInfo).forEach((val) => {
      disabledInfo[val] = disabledInfo[val] <= 0;
    });
  }

  let burger$controls = pageStates.error ? (
    <p>{pageStates.error.message}</p>
  ) : (
    <Loader>Hold on a second...</Loader>
  );
  if (pageStates.ingredients) {
    burger$controls = (
      <>
        <Burger ingredients={pageStates.ingredients} />
        <BuildControls
          removeContent={removeContent}
          addContent={addContent}
          disabled={disabledInfo}
          purchasable={pageStates["can-purchase"]}
          price={pageStates.price}
          ordering={() => {
            setPageStates((prv) => ({ ...prv, purchasing: true }));
          }}
        />
      </>
    );
  }

  const exitSummary = () => {
    setPageStates((prv) => ({ ...prv, purchasing: false }));
  };

  let summary = null;
  if (pageStates.ingredients) {
    summary = (
      <OrderSummary
        contents={pageStates.ingredients}
        cancelPurchase={exitSummary}
        checkout={checkout}
        totalPrice={pageStates.price}
      />
    );
  }

  return (
    <>
      <Modal showModal={pageStates.purchasing} exitModal={exitSummary}>
        {pageStates.loading ? <Loader /> : summary}
      </Modal>
      {burger$controls}
    </>
  );
}

export default ErrorHandler(BurgerBuilder, axios);
