import { Link } from "react-router-dom"
import UserMenu from "./UserMenu";
import Container from "../Container";

const Navbar = () => {

  return (
    <div className="fixed top-0 w-full bg-white z-10 shadow-sm left-0 right-0 mb-10">
      <div className="py-4 border-b-1">
        <Container>
          <header className='z-10 flex justify-between'>
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
              <UserMenu />
            </div>
          </header>
        </Container>
      </div>
    </div>
    // <div className="">
    //   <div className="py-4 border-b-1 z-10 shadow-sm">
    //   <header className='flex justify-between'>
    //     <Link to={'/'} className="flex items-center gap-1">
    //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    //       </svg>
    //       <span className='font-bold text-xl'>staycation</span>
    //     </Link>
    //     <div className='flex flex-row justify-between items-center text-sm font-semibold gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer shadow-gray-300'>
    //       <div>Anywhere</div>
    //       <div className='border-r h-full border-gray-300'></div>
    //       <div>Any week</div>
    //       <div className='border-r h-full border-gray-300'></div>
    //       <div>Add guests</div>
    //       <button className='bg-primary text-white p-1 rounded-full'>
    //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    //           <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    //         </svg>
    //       </button>
    //     </div>
    //     <div className="flex justify-center items-center">
    //       <UserMenu />
    //     </div>
    //   </header>
    //   </div>
    // </div>
  )
}

export default Navbar