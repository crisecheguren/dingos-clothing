import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { signOutAuthUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg';


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  

  
  return (
    <Fragment>
        <div className='navigation'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>Shop</Link>
                {
                  currentUser ? (
                    <span className='nav-link' to='/sign-out' onClick={signOutAuthUser}>Sign Out</span>
                  )
                  : (
                      <Link className='nav-link' to='/auth'>Sign In</Link>
                    )
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
    </Fragment>
  );
}

export default Navigation;