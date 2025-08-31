import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import QuakeWaveLogo from '../../public/assets/QuakeWave_logo.png';
import { navItems } from '../utils/navItems';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <nav className='bg-[#1C1C1E] text-gray-200 shadow-md'>
      <div className='mx-4 md:mx-10 lg:mx-20'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img
                src={QuakeWaveLogo}
                alt='QuakeWave Logo'
                className='w-10 h-10'
              />
              <span className='font-bold text-lg sm:text-xl md:text-2xl'>
                QuakeWatch
              </span>
            </div>
          </Link>

          {/* Desktop navbar */}
          <div className='hidden md:flex items-center gap-6'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className='hover:text-[#327FEF] transition-colors'>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button onClick={toggleMobileMenu}>
              {mobileOpen ? (
                <FaTimes className='w-6 h-6 text-[#327FEF]' />
              ) : (
                <FaBars className='w-6 h-6 text-[#327FEF]' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='md:hidden bg-[#1C1C1E] text-gray-200 px-4 py-2 space-y-2'>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className='block hover:text-[#5D2DE6] transition-colors'
              onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
