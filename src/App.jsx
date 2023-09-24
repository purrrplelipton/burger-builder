import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "./components/ui";
import { BurgerBuilder } from "./containers";
import Layout from "./hoc/layout";

const Checkout = lazy(() => import("./containers/checkout/checkout"));
const Orders = lazy(() => import("./containers/orders/orders"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="checkout/*" element={<Checkout />} />
          <Route path="orders/*" element={<Orders />} />
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
