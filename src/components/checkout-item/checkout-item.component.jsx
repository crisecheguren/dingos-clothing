import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action.js';
import { CheckoutItemContainer } from './checkout-item.styles.jsx';


const CheckoutItem = ({cartItem}) => {
const { name, imageUrl, price, quantity } = cartItem;
const cartItems = useSelector(selectCartItems);
const dispatch = useDispatch();

const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, cartItem));
}

const addItemToCartHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem));
}

const removeItemFromCartHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
}


return (
    <CheckoutItemContainer>
        <div className='image-container'>
            <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div onClick={removeItemFromCartHandler} className='arrow'> &#10094; </div>
                <span className='value'>{quantity}</span>
            <div onClick={addItemToCartHandler} className='arrow'> &#10095; </div>
        </span>
        <span className='price'>{price}</span>
        <div onClick={clearItemHandler} className='remove-button'>&#10005;</div>
    
    </CheckoutItemContainer>
    );
};

export default CheckoutItem;