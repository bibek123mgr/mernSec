import React from 'react'
import ProductItem from '../../global/components/productitem/ProductItem'

const Product:React.FC = () => {
  return (
    <div className='flex gap-10 items-center justify-center flex-wrap max-w-[1400px] px-5 mx-auto my-0'>
          <ProductItem />
          <ProductItem/>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem/>
          <ProductItem />
          <ProductItem/>
    </div>
  )
}

export default Product
