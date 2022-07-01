import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../hooks';

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark p-2'>
      <Link className='navbar-brand' to='/product'>
        Edimca
      </Link>

      <div className='navbar-collapse'>
        <div className='navbar-nav'>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? 'active' : ''}`
            }
            to='/product'
          >
            Products
          </NavLink>
        </div>
      </div>

      <div className='navbar-collapse collapse justify-content-end w-100 order-3 dual-collapse2'>
        <ul className='navbar-nav ml-auto'>
          <span className='nav-item nav-link text-primary'>{user.user}</span>
          <button onClick={startLogout} className='nav-item nav-link btn'>
            logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
