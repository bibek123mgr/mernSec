import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem: React.FC = () => {
  const description ="Lorem ipsum dolor sit amet consectetur, adipisicing elit.Esse vel neque ipsam? Lorem ipsum dolor sit amet consectetur, adipisicing elit.Esse vel neque ipsam?"
  return (
  <div className="max-w-[300px] min-w-[250px] mt-6">
    <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
      <Link to="/productdetails" className="block h-full w-full">
        <img className="max-h-40 w-full object-cover" alt="featured image" src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500">Price: Rs 300/-</p>
          <p className="mb-2 text-xl font-medium text-gray-800">product Name</p>
            <p className="text-md font-light text-gray-400">{description.length > 100 ? description.slice(100)+"..." : description}</p>
          </div>
        </Link>
    </article>
  </div>
  )
}

export default ProductItem
