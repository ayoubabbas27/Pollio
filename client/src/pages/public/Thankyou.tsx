import React from 'react'
import { Link } from 'react-router-dom'

function Thankyou() {
  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center px-5'>
        <div className='py-4 px-6 border-2 border-slate-200 flex flex-col justify-center items-center gap-5 shadow-sm mt-5 rounded-md max-w-[600px]'>
            <Link className="font-bold text-2xl" to="/">
                Poll<span className="text-[#16AF8E]">io</span>
            </Link>

            <span className='text-2xl text-center font-semibold mt-2'>Thank you for participating in the poll</span>

            <span className='text-muted-foreground text-wrap text-center mt-5'>
                <Link to="/sign_up" className="underline text-primary font-semibold mr-1">Sign Up</Link>
                to Pollio now and create the polls that will make your data gathering and decision making easier.
            </span>

        </div>
    </div>
  )
}

export default Thankyou