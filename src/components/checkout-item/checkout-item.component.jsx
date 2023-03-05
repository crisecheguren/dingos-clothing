import './checkout-item.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CheckoutItem = ({cartItem}) => {
const { name, imageUrl, price, quantity } = cartItem;
const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

const clearItemHandler = () => {
    clearItemFromCart(cartItem);
}

const addItemToCartHandler = () => {
    addItemToCart(cartItem);
}

const removeItemFromCartHandler = () => {
    removeItemFromCart(cartItem);
}


return (
    <div className='checkout-item-container'>
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
    
    </div>
    );
};

export default CheckoutItem;