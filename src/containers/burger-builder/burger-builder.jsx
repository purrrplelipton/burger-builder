import { BuildControls, Burger, OrderSummary } from "@components/burger";
import { Loader, Modal } from "@components/ui";
import ErrorHandler from "@src/hoc/error-handler";
import xs from "@src/xs";
import { contentActions } from "@store/actions";
import { func, number, shape } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function BurgerBuilder(props) {
  const {
    total,
    contents,
    // UPDATE_CONTENTS,
    ADD_CONTENT,
    REMOVE_CONTENT,
  } = props;
  const navigate = useNavigate();
  const [pageStates, setPageStates] = useState({
    purchasable: false,
    purchasing: false,
    loading: false,
  });

  useEffect(() => {
    if (contents) {
      const purchasable = Object.values(contents).some((val) => val > 0);
      setPageStates((prv) => ({ ...prv, purchasable }));
    }
    return () => {};
  }, [contents]);

  // useEffect(() => {
  //   setPageStates((prv) => ({ ...prv, loading: true }));
  //   xs.get("/ingredients.json")
  //     .then(({ data }) => UPDATE_CONTENTS(data))
  //     .catch((error) => error)
  //     .finally(() => setPageStates((prv) => ({ ...prv, loading: false })));
  // }, []);

  const proceedToCheckout = () => navigate("/checkout");

  const addContent = (type) => {
    ADD_CONTENT(type);
  };

  const removeContent = (type) => {
    REMOVE_CONTENT(type);
  };

  let controlDisabled = null;

  if (contents) {
    controlDisabled = { ...contents };
    Object.keys(controlDisabled).forEach((k) => {
      controlDisabled[k] = controlDisabled[k] <= 0;
    });
  }

  let PageUI;

  if (contents) {
    PageUI = (
      <>
        <Burger ingredients={contents} />
        <BuildControls
          removeContent={removeContent}
          addContent={addContent}
          disabled={controlDisabled}
          purchasable={pageStates.purchasable}
          price={total}
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
        {contents ? (
          <OrderSummary
            contents={contents}
            cancelPurchase={hideOrderSummary}
            checkout={proceedToCheckout}
            totalPrice={total}
          />
        ) : null}
      </Modal>
      {pageStates.loading ? <Loader>Setting up UI</Loader> : PageUI}
    </>
  );
}

BurgerBuilder.propTypes = {
  UPDATE_CONTENTS: func.isRequired,
  contents: shape({}).isRequired,
  total: number.isRequired,
  ADD_CONTENT: func.isRequired,
  REMOVE_CONTENT: func.isRequired,
};

const mapStateToProps = (state) => {
  const { contents, prices, total } = state.contentsReducer;
  return { contents, prices, total };
};
const mapDispatchToProps = (dispatch) => ({
  UPDATE_CONTENTS: (contents) => {
    dispatch({ type: contentActions.UPDATE_CONTENTS, payload: contents });
  },
  ADD_CONTENT: (type) => {
    dispatch({ type: contentActions.ADD_CONTENT, payload: type });
  },
  REMOVE_CONTENT: (type) => {
    dispatch({ type: contentActions.REMOVE_CONTENT, payload: type });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, xs));
