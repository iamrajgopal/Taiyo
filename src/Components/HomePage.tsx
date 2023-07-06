import React from "react";
import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <>
      <nav className="bg-blue-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16"> 
            <div>
              <Link to='contact'><button className="text-white hover:text-gray-300 px-3 py-2 rounded-md mr-4">Contact Page</button></Link>
             <Link to='charts'> <button className="text-white hover:text-gray-300 px-3 py-2 rounded-md">Charts & Maps</button> </Link>
            </div>
            <div className="text-white font-bold text-xl">Logo</div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mt-8 text-center">Welcome to the Home Page</h1>
      </div>
    </>
  );
}

export default HomePage;
