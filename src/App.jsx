import React from "react";
import BurgerBuilder from "./containers/burgerBuilder";
import Layout from "./hoc/layout";

function App() {
  return (
    <Layout>
      <BurgerBuilder />
    </Layout>
  );
}

export default App;
