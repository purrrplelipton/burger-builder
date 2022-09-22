import React from 'react'

import Layout from './hoc/layout/layout'
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder'
import Auxiliary from './hoc/auxiliary/auxiliary'

function App() {
  return (
    <Auxiliary>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </Auxiliary>
  )
}

export default App
