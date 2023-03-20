import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { signOutAuthUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

import { ReactComponent as Logo } from '../../assets/crown.svg';


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  

  
  return (
    <Fragment>
        <NavigationContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>Shop</NavLink>
                {
                  currentUser ? (
                    <NavLink as='span' to='/sign-out' onClick={signOutAuthUser}>Sign Out</NavLink>
                  )
                  : (
                      <NavLink to='/auth'>Sign In</NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
    </Fragment>
  );
}

export default Navigation;