import React from "react";
import { Route, Routes } from "react-router-dom";
import { BurgerBuilder, Checkout } from "./containers";
import Layout from "./hoc/layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/*">
          <Route index element={<BurgerBuilder />} />
          <Route path="checkout/*" element={<Checkout />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
