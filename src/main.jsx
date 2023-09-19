import React, { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
