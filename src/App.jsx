import React from "react";
import { Route, Routes } from "react-router-dom";
import { BurgerBuilder, Checkout } from "./containers";
import DetailsForm from "./containers/checkout/details-form";
import Layout from "./hoc/layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/checkout/details" element={<DetailsForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<BurgerBuilder />} />
      </Routes>
    </Layout>
  );
}

export default App;
