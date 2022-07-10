import React from 'react'
import ProductsPurchase from './ProductsPurchase'

const PurchasesCard = ({purchase}) => {
  const dateString=purchase.createdAt.slice(0,purchase.createdAt.indexOf("T"))
  const date=new Date(dateString).toDateString().split(" ")
  
  return (
    <article className="purchase-card">
      <h3>{`${date[1]} ${date[2]}, ${date[3]}`}</h3>
      <div className='purchase-card__container'>
        {
          purchase.cart.products.map(product => (
            <ProductsPurchase
              key={product.id}
              product={product}
            />
          ))
        }
      </div>
    </article>
  )
}

export default PurchasesCard