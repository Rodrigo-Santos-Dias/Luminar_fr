import { Link, useNavigate } from 'react-router-dom'
import React,{ useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Navbar() {
  let navigate = useNavigate()

  const { user, handleLogout } = useContext(AuthContext)

  function logout() {

    handleLogout()
    alert('User successfully logged out')
    navigate('/login')
}
  
  let navbarComponent

  return (
    <>
     <div className='w-full bg-gray-800 text-white flex justify-center py-4'>
          <div className="container flex justify-between text-lg">
            <div className='text-2xl font-bold uppercase'>Luminar</div>

            <div className='flex gap-4'>
              <Link to='/login' className='hover:underline'>Login</Link>
              <Link to='/home' className='hover:underline'>Home</Link>
              <Link to="/product" className="hover:underline">Products</Link>
              <Link to='/category' className='hover:underline'>Categories</Link>
              <Link to="/registerCategory"className='hover:underline'>Register Category</Link>
              <Link to="/registerProduct"className='hover:underline'>Register Product</Link>
              <div className='hover:underline'>Profile</div>
              <Link to='' onClick={logout} className='hover:underline'>Logout</Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar