import axios from 'axios'
import React from 'react'
import getConfig from '../../utils/getConfig'
import { useDispatch } from 'react-redux'
import { getAllProductsCart, setCartGlobal } from '../../store/slices/cart.slice'


const CartInfo = ({ productCart }) => {

  const dispatch = useDispatch()

  const deleteProductFromCart = () => {
    const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productCart.id}`

    axios.delete(URL, getConfig())
         .then(res => {
            console.log(res.data)
            dispatch(getAllProductsCart())
          })
         .catch(err => console.log(err.data))
  }

  //los productos eleminados no pueden volver ser añadidos al carrito


  return (
    <section className='cart-info'>
      <header className='cart-info__header'>
        <h4 className='cart-info__subtitle'>{productCart.brand}</h4>
        <h3 className='cart-info__title'>{productCart.title}</h3>
      </header>
      <p className='cart-info__quantity'>{productCart.productsInCart.quantity}</p>
      <p className='cart-info__price'>$ {productCart.price}</p>
      <div onClick={deleteProductFromCart} className='cart-info__btn'>
        <i className="fa-solid fa-trash-can"></i>
      </div>
    </section>
  )
}

export default CartInfo