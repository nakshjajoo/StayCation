import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"

const Header = () => {

  const {user} = useContext(UserContext);

  return (
    <header className='flex justify-between'>
      <Link to={'/'} className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className='font-bold text-xl'>staycation</span>
      </Link>
      <div className='flex flex-row justify-between items-center text-sm font-semibold gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer shadow-gray-300'>
        <div>Anywhere</div>
        <div className='border-r h-full border-gray-300'></div>
        <div>Any week</div>
        <div className='border-r h-full border-gray-300'></div>
        <div>Add guests</div>
        <button className='bg-primary text-white p-1 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center items-center">
        {/* <Link to={'/account/places/new'} className="mr-2 font-semibold hover:bg-gray-200 py-2 px-3 md:py-1 md:px-2 rounded-full transition cursor-pointer">
          Staycation your home
        </Link> */}
        <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </div>
    </header>
  )
}

export default Header