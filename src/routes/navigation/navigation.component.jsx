import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { signOutAuthUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg';


const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log('Navigation',currentUser);
  
  const signOutHandler = async () => {
    try {
      await signOutAuthUser();
      setCurrentUser(null);
    } catch (error) {
      console.log('Error signing out', error);
    }
  };
  
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
                    <span className='nav-link' to='/sign-out' onClick={signOutHandler}>Sign Out</span>
                  )
                  : (
                      <Link className='nav-link' to='/auth'>Sign In</Link>
                    )
                }
            </div>
        </div>
        <Outlet />
    </Fragment>
  );
}

export default Navigation;