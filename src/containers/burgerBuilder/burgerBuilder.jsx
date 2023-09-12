import { BuildControls, Burger, OrderSummary } from "@c/burger";
import { Modal, Spinner } from "@c/ui";
import React, { useReducer } from "react";
import axios from "../../axios_orders";

const CONTENT_PRICES = {
  lettuce: 50,
  bacon: 200,
  cheese: 100,
  onionRings: 100,
  pickles: 50,
  patty: 300,
  tomato: 50,
};

function BurgerBuilder() {
  const [state, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), {
    ingredients: {
      pickles: 0,
      cheese: 0,
      onionRings: 0,
      patty: 0,
      lettuce: 0,
      bacon: 0,
      tomato: 0,
    },
    price: 100,
    canPurchase: false,
    purchasing: false,
    loading: false,
  });

  const updatePurchaseState = (contents) => {
    const totalContents = Object.values(contents).reduce(
      (sum, el) => sum + el,
      0
    );
    dispatch({ canPurchase: totalContents > 0 });
  };

  const checkout = () => {
    // window.alert("proceed to checkout!");

    dispatch({ loading: true });

    const order = {
      contents: state.ingredients,
      price: state.price.toFixed(2),
      customer: {
        name: "Maximus Elrond",
        address: {
          street: "TestStreet 1",
          zipCode: "41351",
          country: "Germany",
        },
        eMail: "test@test.com",
        deliveryMethod: "fastest",
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

  const disabledInfo = structuredClone(state.ingredients);
  Object.keys(disabledInfo).forEach((val) => {
    disabledInfo[val] = disabledInfo[val] <= 0;
  });

  return (
    <>
      <Modal
        showModal={state.purchasing}
        exitModal={() => dispatch({ purchasing: false })}
      >
        {state.loading ? (
          <Spinner />
        ) : (
          <OrderSummary
            contents={state.ingredients}
            cancelPurchase={() => dispatch({ purchasing: false })}
            checkout={checkout}
            totalPrice={state.price}
          />
        )}
      </Modal>
      <Burger ingredients={state.ingredients} />
      <BuildControls
        removeContent={removeContent}
        addContent={addContent}
        disabled={disabledInfo}
        purchasable={state.canPurchase}
        price={state.price}
        ordering={() => dispatch({ purchasing: true })}
      />
    </>
  );
}

export default BurgerBuilder;
