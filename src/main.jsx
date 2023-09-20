import React, { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "./components/ui";
import { BurgerBuilder } from "./containers";
import Layout from "./hoc/layout";
import "./index.css";

const Checkout = lazy(() => import("./containers/checkout/checkout"));
const Orders = lazy(() => import("./containers/orders/orders"));

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="checkout/*" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="/" element={<BurgerBuilder />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
