import React from 'react';
import logo from "../assets/images/burros_blancos.png";


function Navbar() {
  return (
    <nav className='bg-slate-400 border-rose-800 border-b-2'>
        <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-20" />
        </div>

        {/* Title in the center */}
        <div className="flex-grow text-center">
          <h1 className="text-black lg:text-4xl md:text-3xl sm:text-2xl font-bold">Prototipo Sembrador de Maiz Semiautónomo</h1>
        </div>

        {/* Placeholder for alignment purposes */}
        <div className="flex-shrink-0 w-8 h-8"></div>
      </div>
    </nav>
  )
}

export default Navbar
