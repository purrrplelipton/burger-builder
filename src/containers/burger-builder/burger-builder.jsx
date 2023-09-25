import { BuildControls, Burger, OrderSummary } from "@components/burger";
import { Loader, Modal } from "@components/ui";
import ErrorHandler from "@src/hoc/error-handler";
import xs from "@src/xs";
import { contents as contentsActions } from "@store/actions";
import { bool, func, shape } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function BurgerBuilder({ error, loading, SET_CONTENTS }) {
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => SET_CONTENTS(), []);

  const hideSummary = () => setShowSummary(false);

  return (
    <>
      <Modal showModal={showSummary} exitModal={hideSummary}>
        <OrderSummary cancelPurchase={hideSummary} />
      </Modal>
      {loading ? (
        <Loader>Setting up UI</Loader>
      ) : (
        <>
          <Burger />
          <BuildControls proceed={() => setShowSummary(true)} />
        </>
      )}
    </>
  );
}

BurgerBuilder.defaultProps = { error: null };

BurgerBuilder.propTypes = {
  error: shape({}),
  loading: bool.isRequired,
  SET_CONTENTS: func.isRequired,
};

const mapStateToProps = (state) => {
  const { error, loading } = state.contents;
  return { error, loading };
};

const mapDispatchToProps = (dispatch) => ({
  SET_CONTENTS: () => dispatch(contentsActions.setContents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, xs));
