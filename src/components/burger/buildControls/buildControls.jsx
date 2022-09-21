import React from 'react'
import propTypes from 'prop-types'

import styles from './buildControls.module.css'
import BuildControl from './buildControl/buildControl'
import Aux from '../../../hoc/aux'

const controls = [
  { label: 'Lettuce', type: 'lettuce' },
  { label: 'Patty', type: 'patty' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Pickles', type: 'pickles' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Onion Rings', type: 'onionRings' },
  { label: 'Tomato', type: 'tomato' },
]

const BuildControls = (props) => (
  <Aux>
    <p className={styles.currentPrice}>
      Current Price:
      <strong> $ {props.price.toFixed(2)}</strong>
    </p>
    <div className={styles.buildControls}>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          add={() => props.addContent(ctrl.type)}
          remove={() => props.removeContent(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
    </div>
    <button
      className={styles.orderButton}
      disabled={!props.purchasable}
      onClick={props.ordering}
    >
      PLACE ORDER
    </button>
  </Aux>
)

BuildControls.propTypes = {
  removeContent: propTypes.func.isRequired,
  addContent: propTypes.func.isRequired,
  disabled: propTypes.object.isRequired,
  price: propTypes.number.isRequired,
  purchasable: propTypes.bool.isRequired,
  ordering: propTypes.func.isRequired,
}

export default BuildControls
