import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllproducts } from '../../store/slices/products.slice'
import FilterScreen from './FilterScreen'
import InputSearch from './InputSearch'
import ProductCard from './ProductCard'
import './style/homeScreen.css'

const HomeScreen = () => {

  
  const [searchProduct, setSearchProduct] = useState()
  const [filterProducts, setFilterProducts] = useState()
  const [filterByType, setFilterByType] = useState()
  const [filterByPrice, setFilterByPrice] = useState({})
  const products = useSelector(state => state.products)
  
  //console.log(products)

  // useEffect(() =>{
  //   dispatch(getAllproducts())
  // }, []) 
  //console.log(searchProduct.searchText)
  useEffect(() => {
    if (searchProduct){
      setFilterProducts(products.filter(e=>e.title.toLowerCase().includes(searchProduct.searchText.toLowerCase())))
    }else{
      setFilterProducts(products)
    }

    
  }, [searchProduct])

  useEffect(() => {
    if (filterByType){
      setFilterProducts(products.filter(e=>e.category.name===filterByType))
    } else{
      setFilterProducts(products)
    }
  }, [filterByType])
  

  useEffect(() => {
    if (filterByPrice.from){
      setFilterProducts(products.filter(e => ((parseFloat(e.price) >= filterByPrice.from) && (parseFloat(e.price) <= filterByPrice.to))))
    }else{
      setFilterProducts(products)
    }
    
  }, [filterByPrice])
  
  
  return (
    <div className='home'>
      <InputSearch
        setSearchProduct={setSearchProduct}
      />
      <FilterScreen
        setFilterByType={setFilterByType}
        setFilterByPrice={setFilterByPrice}
      />
      <div className="products-container">
        {
          filterProducts?.map(product=>(
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        }
      </div>
    </div>
  )
}

export default HomeScreen