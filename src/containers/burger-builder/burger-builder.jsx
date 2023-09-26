import { BuildControls, Burger, OrderSummary } from "@components/burger";
import { Loader, Modal } from "@components/ui";
import ErrorHandler from "@src/hoc/error-handler";
import xs from "@src/xs";
import { contents as contentsActions } from "@store/actions";
import { bool, func, shape } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function BurgerBuilder({ error, SET_CONTENTS, loading, contents }) {
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    SET_CONTENTS();
  }, []);

  const hideSummary = () => setShowSummary(false);

  return contents ? (
    <>
      <Modal showModal={showSummary} exitModal={hideSummary}>
        <OrderSummary cancelPurchase={hideSummary} />
      </Modal>
      <Burger />
      <BuildControls proceed={() => setShowSummary(true)} />
    </>
  ) : (
    <Loader />
  );
}

BurgerBuilder.defaultProps = { error: null, contents: null };

BurgerBuilder.propTypes = {
  error: shape({}),
  loading: bool.isRequired,
  SET_CONTENTS: func.isRequired,
  contents: shape({}),
};

const mapStateToProps = (state) => {
  const { error, loading, contents } = state.contents;
  return { error, loading, contents };
};

const mapDispatchToProps = (dispatch) => ({
  SET_CONTENTS: () => dispatch(contentsActions.fetchContents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, xs));
