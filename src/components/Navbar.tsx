import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import QuakeWaveLogo from '../../public/assets/QuakeWave_logo.png';

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Alerts', href: '/alerts' },
  { label: 'Settings', href: '/settings' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const openOnKeyboard = useRef(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const handleToggleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === 'Enter') openOnKeyboard.current = true;
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!openOnKeyboard.current) return;

    if (mobileOpen) {
      requestAnimationFrame(() => firstLinkRef.current?.focus());
    } else {
      requestAnimationFrame(() => toggleBtnRef.current?.focus());
      openOnKeyboard.current = false; 
    }
  }, [mobileOpen]);

  return (
    <nav
      aria-label='Navigation bar'
      className='bg-[#1C1C1E] text-gray-200 shadow-md'>
      <div className='mx-4 md:mx-10 lg:mx-20'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img
                src={QuakeWaveLogo}
                alt='QuakeWave Logo'
                className='w-10 h-10'
              />
              <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>
                QuakeWatch
              </h1>
            </div>
          </Link>

          <ul
            id='navigation-bar'
            role='list'
            className={[
              mobileOpen ? 'block' : 'hidden',
              'absolute left-0 right-0 top-16 z-40 bg-[#1C1C1E] px-4 py-2 space-y-2',
              'md:static md:flex md:items-center md:space-y-0 md:gap-8 md:bg-transparent md:px-0 md:py-0',
            ].join(' ')}>
            {navItems.map((navItem, id) => (
              <li key={navItem.href}>
                <NavLink
                  to={navItem.href}
                  ref={id === 0 ? firstLinkRef : null}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      'block py-2 transition-colors',
                      'hover:text-[#327FEF]',
                      isActive ? 'text-[#327FEF]' : '',
                    ].join(' ')
                  }>
                  {navItem.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className='md:hidden'>
            <button
              type='button'
              ref={toggleBtnRef}
              onClick={toggleMobileMenu}
              onKeyDown={handleToggleKeyDown}
              aria-expanded={mobileOpen}
              aria-controls='navigation-bar'
              aria-label={mobileOpen ? 'Close main menu' : 'Open main menu'}>
              {mobileOpen ? (
                <FaTimes className='w-6 h-6 text-[#327FEF]' />
              ) : (
                <FaBars className='w-6 h-6 text-[#327FEF]' />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
