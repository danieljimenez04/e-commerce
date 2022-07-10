import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import getConfig from '../../utils/getConfig'
import CartInfo from './CartInfo'
import './style/cartScreen.css'
import { useDispatch } from 'react-redux'
import { setCartGlobal } from '../../store/slices/cart.slice'


const CartScreen = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const postPurchase = () => {

    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/purchases'
    const objPurchase = {
      street: "Green St. 1456",
      colony: "Southwest",
      zipCode: 12345,
      city: "USA",
      references: "Some references"
    }

    axios.post(URL, objPurchase, getConfig())
      .then(res => {
        console.log(res.data)
        dispatch(setCartGlobal(null))
      })
      .catch(err => console.log(err.data))

  }


  let totalPriceCart = 0
  if (cart) {
    //usando .reduce()
    //acc,cv,idx
    const cb = (acc, cv) => {
      return acc + (cv.price * cv.productsInCart.quantity)
    }
    totalPriceCart = cart.reduce(cb, 0)
  }
  
  return (
    <div className='cart'>
      <h2 className='cart__title'>My Cart</h2>
      <div className='cart__container'>
        {
          cart?.map(productCart => (
            <CartInfo
              key={productCart.id}
              productCart={productCart}
            />
          ))
        }
      </div>
      {
        cart ?
          <h2 className='cart__total'>
            <span className='cart__total-label'>Total: $</span>
            <span className='cart__total_number'>
              {totalPriceCart}
            </span>
          </h2>
          :
          <h2>The cart is empty</h2>
      }
      <button
        className='cart__btn'
        onClick={postPurchase}
      >Confirm Purchase</button>
    </div>
  )
}

export default CartScreen