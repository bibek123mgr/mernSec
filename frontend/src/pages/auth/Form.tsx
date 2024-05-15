import { useState } from "react";
import { Link } from "react-router-dom";

interface FormProps {
  page: string;
}

const Form: React.FC<FormProps> = ({ page }) => {
  const [Userdata, setUserData] = useState({
  userName:'',
  email: '',
  password:''
  })
const handleChange = (e:any) => {
  const { name, value } = e.target
  setUserData({
    ...Userdata,
    [name]:value
  })
  }
  
  const handleLogin = () => {
    
  }
  const handleRegister = () => {
    
  }
  console.log(page)
  return (
<div className="font-[sans-serif] text-[#333] mt-4 min-h-[80vh] flex items-center justify-center">
      <div className="flex fle-col items-center justify-center py-6 px-4">
          <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-3">

            {page === '1' ?
            <div className="mb-7">
                <h2 className="text-4xl font-extrabold">Sign in</h2>
                <p className="text-sm mt-2">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
            </div>
                :
            <div className="mb-7">
                <h2 className="text-4xl font-extrabold">Sign up</h2>
                  <p className="text-sm mt-2">Unlock endless opportunities as you embark on your journey with us. Your adventure begins with Signup.</p>
            </div>
              }
            {page === '0' ? 
            <div>
                <label className="text-sm mb-1 block">User name</label>
                <div className="relative flex items-center">
                  <input name="username" type="text" onChange={handleChange} required className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter user name" />
                </div>
              </div>
              :
              <div></div>
          }

              <div>
                <label className="text-sm mb-1 block">Email Address</label>
                <div className="relative flex items-center">
                  <input name="email" type="email" onChange={handleChange} required className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter user name" />
                </div>
              </div>
              <div>
                <label className="text-sm mb-1 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type="password" onChange={handleChange} required className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter password" />
                </div>
              </div>
            <div className="flex items-center justify-between gap-2">
              {page === '1' ?
                <>
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forget" className="text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                  </div>
                </>
                :
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    I accept all<Link to='/' className="text-blue-600 hover:underline"> Terms & Conditions</Link>
                  </label>
                </div>               
            }
              </div>
              <div className="!mt-4">
              {page !== '1' ?
                  <button type="button" onSubmit={handleRegister} className="w-full shadow-xl py-2.5 px-4 text-md font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none">
                  Sign up
                </button> 
                :
                <button type="button" onSubmit={handleLogin} className="w-full shadow-xl py-2.5 px-4 text-md font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none">
                  Sign in
                </button> 
                }
            </div>
            {page === '1' ?
              <p className="text-sm !mt-4 text-center">Don't have an account ? <Link to="/register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
              :
              <p className="text-sm !mt-4 text-center">Already have an account ? <Link to="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap">Login</Link></p>
          }
            </form>
          </div>
      </div>
    </div>
  )
}

export default Form
