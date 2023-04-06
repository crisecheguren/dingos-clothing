import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer } from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };
    return (
        <CartDropdownContainer>
            <div className="cart-items">
                {cartItems.map ( item => <CartItem key={item.id} cartItem={item} />)}
            </div>
                <Button onClick={handleCheckout} buttonType={'inverted'}>Go to checkout</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;