import React from 'react'
import propTypes from 'prop-types'

import BurgerIngredient from './burgerIngredients/burgerIngredients'
import styles from './burger.module.css'

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientKey) =>
      [...Array(props.ingredients[ingredientKey])].map((_, i) => (
        <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
      ))
    )
    .reduce((arr, el) => arr.concat(el), [])

  transformedIngredients.length === 0
    ? (transformedIngredients = <p>Add some contents to your burger!</p>)
    : null

  return (
    <div className={styles.burger}>
      <BurgerIngredient type={'bread-top'} />
      {transformedIngredients}
      <BurgerIngredient type={'bread-bottom'} />
    </div>
  )
}

Burger.propTypes = { ingredients: propTypes.object }

export default Burger
