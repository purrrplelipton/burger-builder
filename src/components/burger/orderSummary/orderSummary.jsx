import React from 'react'
import propTypes from 'prop-types'

import Aux from '../../../hoc/aux'
import Button from '../../ui/button/button'

const OrderSummary = (props) => {
  const contentSummary = Object.keys(props.contents).map(
    (contentKey, contentIndex) => (
      <li key={contentKey + contentIndex + '_' + props.contents[contentKey]}>
        <span style={{ textTransform: 'capitalize' }}>{contentKey}</span>:{' '}
        {props.contents[contentKey]}
      </li>
    )
  )

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A burger with the following contents:</p>
      <ul>{contentSummary}</ul>
      <p>
        Total: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Checkout?</p>
      <Button btnType={'danger'} onClick={props.cancelPurchase}>
        CANCEL
      </Button>
      <Button btnType={'success'} onClick={props.checkout}>
        CONTINUE
      </Button>
    </Aux>
  )
}

OrderSummary.propTypes = {
  contents: propTypes.object.isRequired,
  cancelPurchase: propTypes.func.isRequired,
  checkout: propTypes.func.isRequired,
  totalPrice: propTypes.number.isRequired,
}

export default OrderSummary
