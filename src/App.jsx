import React from 'react'

import Layout from './components/layout/layout'
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder'
import Aux from './hoc/aux'

function App() {
  return (
    <Aux>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </Aux>
  )
}

export default App
