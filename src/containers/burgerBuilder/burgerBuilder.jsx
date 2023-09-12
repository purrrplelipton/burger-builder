import { BuildControls, Burger, OrderSummary } from "@components/burger";
import { Modal, Spinner } from "@components/ui";
import axios from "@src/axios";
import ErrorHandler from "@src/hoc/error-handler";
import React, { useEffect, useReducer } from "react";

const CONTENT_PRICES = {
  lettuce: 50,
  bacon: 200,
  cheese: 100,
  "onion-rings": 100,
  pickles: 50,
  patty: 300,
  tomato: 50,
};

function BurgerBuilder() {
  const [state, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), {
    ingredients: null,
    price: 100,
    "can-purchase": false,
    purchasing: false,
    loading: false,
  });

  useEffect(() => {
    axios
      .get("/ingredients.json")
      .then(({ data }) => dispatch({ ingredients: data }));
  }, []);

  const updatePurchaseState = (contents) => {
    const totalContents = Object.values(contents).reduce(
      (sum, el) => sum + el,
      0
    );
    dispatch({ "can-purchase": totalContents > 0 });
  };

  const checkout = () => {
    dispatch({ loading: true });

    const order = {
      contents: state.ingredients,
      price: state.price.toFixed(2),
      customer: {
        name: "Maximus Elrond",
        address: {
          street: "TestStreet 1",
          "zip-code": "41351",
          country: "Germany",
        },
        email: "test@test.com",
        "delivery-method": "fastest",
      },
    };

    axios
      .post("/orders.json", order)
      .finally(() => dispatch({ loading: false, purchasing: false }));
  };

  const addContent = (type) => {
    const updatedContents = structuredClone(state.ingredients);
    updatedContents[type] = state.ingredients[type] + 1;

    const updatedPrice = state.price + CONTENT_PRICES[type];
    dispatch({ ingredients: updatedContents, price: updatedPrice });
    updatePurchaseState(updatedContents);
  };

  const removeContent = (type) => {
    const updatedContents = structuredClone(state.ingredients);
    updatedContents[type] =
      state.ingredients[type] <= 0
        ? state.ingredients[type] - 0
        : state.ingredients[type] - 1;

    const updatedPrice = state.price - CONTENT_PRICES[type];
    dispatch({ ingredients: updatedContents, price: updatedPrice });
    updatePurchaseState(updatedContents);
  };

  let disabledInfo = null;

  if (state.ingredients) {
    disabledInfo = structuredClone(state.ingredients);
    Object.keys(disabledInfo).forEach((val) => {
      disabledInfo[val] = disabledInfo[val] <= 0;
    });
  }

  let burger$controls = <Spinner />;
  if (state.ingredients) {
    burger$controls = (
      <>
        <Burger ingredients={state.ingredients} />
        <BuildControls
          removeContent={removeContent}
          addContent={addContent}
          disabled={disabledInfo}
          purchasable={state["can-purchase"]}
          price={state.price}
          ordering={() => dispatch({ purchasing: true })}
        />
      </>
    );
  }

  const exitSummary = () => dispatch({ purchasing: false });

  let summary = null;
  if (state.ingredients) {
    summary = (
      <OrderSummary
        contents={state.ingredients}
        cancelPurchase={exitSummary}
        checkout={checkout}
        totalPrice={state.price}
      />
    );
  }

  return (
    <>
      <Modal showModal={state.purchasing} exitModal={exitSummary}>
        {state.loading ? <Spinner /> : summary}
      </Modal>
      {burger$controls}
    </>
  );
}

export default ErrorHandler(BurgerBuilder, axios);
