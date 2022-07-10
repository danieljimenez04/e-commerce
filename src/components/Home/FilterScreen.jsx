import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import getConfig from '../../utils/getConfig'

const FilterScreen = ({ setFilterByType, setFilterByPrice }) => {
  const { register, handleSubmit, reset } = useForm()
  const [categories, setCategories] = useState()
  const [showFilterPrice, setShowFilterPrice] = useState(false)
  const [showFilterCategory, setShowFilterCategory] = useState(false)
  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/products/categories'
    axios.get(URL, getConfig())
      .then(res => setCategories(res.data.data.categories))
      .catch(err => console.log(err.data))
  }, [])



  const selectCategory = (e) => {
    //e.target.classList.toggle('filter__category-active')
    //console.log(e.target.firstChild.data)
    setFilterByType(e.target.firstChild.data)
  }

  const filterByPrice = (data) => {
    setFilterByPrice(data)
    reset({
      from: '',
      to: ''
    })
  }

  const showPrice = () => {
    setShowFilterPrice(!showFilterPrice)
  }

  const showCategory=()=>{
    setShowFilterCategory(!showFilterCategory)
  }

  const showAllFilters=()=>{
    setShowFilters(!showFilters)
  }

  return (
    <>
    <div onClick={showAllFilters} className='shown-hidden__filters'>
      <i className="fa-solid fa-filter"></i>Filters
    </div>
    
    {
      !showFilters ?

    <div className="filter-container">
      <div className="filter-container__price">
        <h3>Price</h3>
        <div className="shown-hidden__price" onClick={showPrice}>
          {
            showFilterPrice ?
            <i className="fa-solid fa-angle-down"></i>
              :
            <i className="fa-solid fa-angle-up"></i>
          }

        </div>
        <div className="shown-hidden-price__content">
          {
            showFilterPrice ?

            <form onSubmit={handleSubmit(filterByPrice)} className="filter-form__price">
            <label htmlFor="from">From</label>
            <input id="from" type="number"  className='price-from' {...register('from')} />
            <label htmlFor="to">To</label>
            <input id="to" type="number"  className='price-to' {...register('to')} />
            <button >Filter Price</button>
            </form>
            : 
            ''
          }
        </div>
      </div>

      <div className="filter-container__category">
        <h3>Category</h3>
        <div className="shown-hidden__category" onClick={showCategory}>
          {
            showFilterCategory ?
            <i className="fa-solid fa-angle-down"></i>
              :
            <i className="fa-solid fa-angle-up"></i>
          }

        </div>

        <div className="shown-hidde-content__category">
          {
            showFilterCategory ?
            <ul>
              {
                categories?.map(category => (
                  <li key={category.id} onClick={selectCategory} className='filter__category'>{category.name}</li>
                )
                )
              }
            </ul>
            : 

            '' 
          }


        </div>
      </div>

    </div>
      : 
      ''
    }

    </>
    
  )
}

export default FilterScreen