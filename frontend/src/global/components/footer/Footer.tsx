import React from 'react'
import { Link } from 'react-router-dom'

const Footer:React.FC = () => {
  return (


<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="https://flowbite.com/" className="hover:underline">Flowbite™</Link>. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer
