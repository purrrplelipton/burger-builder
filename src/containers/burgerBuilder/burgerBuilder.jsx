import React, { useState } from "react";

import Auxiliary from "../../hoc/auxiliary/auxiliary";
import Burger from "../../components/burger/burger";
import BuildControls from "../../components/burger/buildControls/buildControls";
import Modal from "../../components/ui/modal/modal";
import OrderSummary from "../../components/burger/orderSummary/orderSummary";
import axios from "../../axios_orders";
import Spinner from "../../components/ui/spinner/spinner";
import withErrorHandler from "../../hoc/with_error_handler/with_error_handler";

const CONTENT_PRICES = {
  lettuce: 0.25,
  bacon: 0.75,
  cheese: 1,
  onionRings: 0.35,
  pickles: 0.2,
  patty: 1,
  tomato: 0.5,
};

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    pickles: 0,
    cheese: 0,
    onionRings: 0,
    patty: 0,
    lettuce: 0,
    bacon: 0,
    tomato: 0,
  });
  const [price, setPrice] = useState(3.35);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const updatePurchaseState = (contents) => {
    const totalContents = Object.values(contents).reduce((sum, el) => sum + el);
    setPurchasable(totalContents > 0);
  };

  const purchasingHandler = () => setPurchasing(true);

  const cancelPurchase = () => setPurchasing(false);

  const checkout = () => {
    // window.alert("proceed to checkout!");

    setLoading(true);

    const order = {
      contents: ingredients,
      price: price.toFixed(2),
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
      .then(() => {
        setLoading(false);
        setPurchasing(false);
      })
      .catch(() => {
        setLoading(false);
        setPurchasing(false);
      });
  };

  const addContentHandler = (type) => {
    const updatedContents = { ...ingredients };
    updatedContents[type] = ingredients[type] + 1;

    const updatedPrice = price + CONTENT_PRICES[type];

    setIngredients(updatedContents);
    setPrice(updatedPrice);
    updatePurchaseState(updatedContents);
  };

  const removeContentHandler = (type) => {
    const updatedContents = { ...ingredients };
    updatedContents[type] =
      ingredients[type] <= 0 ? ingredients[type] - 0 : ingredients[type] - 1;

    const updatedPrice = price - CONTENT_PRICES[type];

    setIngredients(updatedContents);
    setPrice(updatedPrice);
    updatePurchaseState(updatedContents);
  };

  const disabledInfo = { ...ingredients };
  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Auxiliary>
      <Modal showModal={purchasing} exitModal={cancelPurchase}>
        {loading ? (
          <Spinner />
        ) : (
          <OrderSummary
            contents={ingredients}
            cancelPurchase={cancelPurchase}
            checkout={checkout}
            totalPrice={price}
          />
        )}
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls
        removeContent={removeContentHandler}
        addContent={addContentHandler}
        disabled={disabledInfo}
        purchasable={purchasable}
        price={price}
        ordering={purchasingHandler}
      />
    </Auxiliary>
  );
};

export default withErrorHandler(BurgerBuilder);
