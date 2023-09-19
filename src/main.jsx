import React, { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader } from "./components/ui";
import { BurgerBuilder } from "./containers";
import Layout from "./hoc/layout";
import "./index.css";

const Checkout = lazy(() => import("./containers/checkout/checkout"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="checkout/*" element={<Checkout />} />
            <Route path="/" element={<BurgerBuilder />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
