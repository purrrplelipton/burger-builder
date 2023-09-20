import { BuildControls, Burger, OrderSummary } from "@components/burger";
import { Loader, Modal } from "@components/ui";
import ErrorHandler from "@src/hoc/error-handler";
import xs from "@src/xs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BurgerBuilder() {
  const navigate = useNavigate();
  const [pageStates, setPageStates] = useState({
    ingredients: null,
    total: 100,
    prices: {
      lettuce: 50,
      bacon: 200,
      cheese: 100,
      "onion-ring": 100,
      pickles: 50,
      patty: 300,
      tomato: 50,
    },
    purchasable: false,
    purchasing: false,
    loading: false,
  });

  function updatePurchasability(ingredients) {
    const ingredientsValues = Object.values(ingredients);
    const purchasable = ingredientsValues.some((val) => val > 0);
    return setPageStates((prv) => ({ ...prv, purchasable }));
  }

  function updateTotal(ingredients) {
    let new$total = pageStates.total;
    Object.keys(ingredients).forEach((key) => {
      if (ingredients[key] > 0) {
        for (let i = 0; i < ingredients[key]; i += 1) {
          new$total += pageStates.prices[key];
        }
      }
    });
    return setPageStates((prv) => ({ ...prv, total: new$total }));
  }

  useEffect(() => {
    setPageStates((prv) => ({ ...prv, loading: true }));
    xs.get("/ingredients.json")
      .then(({ data }) => {
        setPageStates((prv) => {
          const newState = { ...prv, ingredients: data };
          return newState;
        });
        updateTotal(data);
        updatePurchasability(data);
      })
      .catch((error) => error)
      .finally(() => setPageStates((prv) => ({ ...prv, loading: false })));
  }, []);

  const proceedToCheckout = () => {
    navigate("/checkout", {
      state: { ingredients: pageStates.ingredients, total: pageStates.total },
    });
  };

  const addContent = (type) => {
    setPageStates((prv) => {
      const updated$ingredients = { ...prv.ingredients };
      let updated$total = prv.total;
      updated$ingredients[type] += 1;
      updated$total += prv.prices[type];
      const newState = {
        ...prv,
        ingredients: updated$ingredients,
        total: updated$total,
      };
      updatePurchasability(newState.ingredients);
      return newState;
    });
  };

  const removeContent = (type) => {
    setPageStates((prv) => {
      const updated$ingredients = { ...prv.ingredients };
      let updated$total = prv.total;
      if (updated$ingredients[type] > 0) {
        updated$ingredients[type] -= 1;
        updated$total -= prv.prices[type];
      }
      const newState = {
        ...prv,
        ingredients: updated$ingredients,
        total: updated$total,
      };
      updatePurchasability(newState.ingredients);
      return newState;
    });
  };

  let dsbld = null;

  if (pageStates.ingredients) {
    dsbld = { ...pageStates.ingredients };
    Object.keys(dsbld).forEach((k) => {
      dsbld[k] = dsbld[k] <= 0;
    });
  }

  let PageUI;

  if (pageStates.ingredients) {
    PageUI = (
      <>
        <Burger ingredients={pageStates.ingredients} />
        <BuildControls
          removeContent={removeContent}
          addContent={addContent}
          disabled={dsbld}
          purchasable={pageStates.purchasable}
          price={pageStates.total}
          ordering={() => {
            setPageStates((prv) => ({ ...prv, purchasing: true }));
          }}
        />
      </>
    );
  }

  const hideOrderSummary = () => {
    setPageStates((prv) => ({ ...prv, purchasing: false }));
  };

  return (
    <>
      <Modal showModal={pageStates.purchasing} exitModal={hideOrderSummary}>
        {pageStates.ingredients ? (
          <OrderSummary
            contents={pageStates.ingredients}
            cancelPurchase={hideOrderSummary}
            checkout={proceedToCheckout}
            totalPrice={pageStates.total}
          />
        ) : null}
      </Modal>
      {pageStates.loading ? <Loader>Setting up UI</Loader> : PageUI}
    </>
  );
}

export default ErrorHandler(BurgerBuilder, xs);
