import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllProductsCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'


const ProductCard = ({ product }) => {
  //console.log(product)
  const navigate = useNavigate()
  const goToProductId = () => navigate(`/product/${product.id}`)
  const [addSucces, setAddSucces] = useState()
  //console.log(product)

  
  const dispatch=useDispatch()
  
  const addProduct=(e)=>{
    e.stopPropagation()
    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/cart'
    const objProduct = {
      id: product.id,
      quantity: 1
      }
  
    axios.post(URL, objProduct, getConfig())
        .then(res=>{
          console.log(res.data)
          dispatch(getAllProductsCart())
          setAddSucces('success')
        })
        .catch(err=>console.log(err.data))
        
    setTimeout(setAddSucces(),5000)
    
    
  }
  
  
  
  return (
    <article onClick={goToProductId} className='card-product'>
      <header className='card-product__header'>
        <img
          className='card-product__img-back'
          src={product.productImgs[1]}
          alt=""
        />
        <img
          className='card-product__img'
          src={product.productImgs[0]}
          alt=""
        />
      </header>
      <div className='card-product__body'>
        <h2 className='card-product__title'>{product.title}</h2>
        <div className='card-product__price-container'>
          <h3 className='card-product__price-label'>Price</h3>
          <p className='card-product__price-number'>$ {product.price}</p>
        </div>
        <button onClick={addProduct} className='card-product__btn'>
          <i className="fa-solid fa-cart-plus"></i>
        </button>
        {
          addSucces ?
          <span className='succes-message'>{addSucces}</span>
          : 
          ''
        }
        
      </div>
    </article>
  )
}

export default ProductCard