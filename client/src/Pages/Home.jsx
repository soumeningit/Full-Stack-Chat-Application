import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate=useNavigate();

  return (
    <div className='flex flex-row gap-x-4 justify-center'>
      Home
      <button 
       onClick={()=>navigate("/signup")}
        className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
      >
        Sign Up
      </button>
      <button 
        onClick={()=>navigate("/login")}
        className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
      >
        Log In
      </button>

    </div>
  )
}

export default Home