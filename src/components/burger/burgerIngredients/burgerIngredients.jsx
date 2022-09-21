import React from 'react'
import propTypes from 'prop-types'

import styles from './burgerIngredients.module.css'

const BurgerIngredient = (props) => {
  let ingredient = null

  switch (props.type) {
  case 'bread-bottom':
    ingredient = <div className={styles.breadBottom}></div>
    break
  case 'bread-top':
    ingredient = (
      <div className={styles.breadTop}>
        <div className={styles.seeds1}></div>
        <div className={styles.seeds2}></div>
        <div className={styles.seeds3}></div>
        <div className={styles.seeds4}></div>
      </div>
    )
    break
  case 'patty':
    ingredient = <div className={styles.patty}></div>
    break
  case 'tomato':
    ingredient = <div className={styles.tomato}></div>
    break
  case 'pickles':
    ingredient = <div className={styles.pickles}></div>
    break
  case 'bacon':
    ingredient = <div className={styles.bacon}></div>
    break
  case 'lettuce':
    ingredient = <div className={styles.lettuce}></div>
    break
  case 'onionRings':
    ingredient = <div className={styles.onionRings}></div>
    break
  case 'cheese':
    ingredient = <div className={styles.cheese}></div>
    break

  default:
    ingredient = null
    break
  }
  return ingredient
}

BurgerIngredient.propTypes = { type: propTypes.string.isRequired }

export default BurgerIngredient
