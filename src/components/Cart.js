import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () =>{
    const [IsOpen, setIsOpen] = useState(false);
    const {cartItems, cartTotal, cartCount, removeFromCart, clearCart} = useCart();

    const toggleCart = () => {
        setIsOpen(!IsOpen);
    };

    return(
        // (<>...</>): Wrap elements in <Fragment> to group them together in situations where you need a single element. Grouping elements in Fragment has no effect on the resulting DOM; it is the same as if the elements were not grouped. The empty JSX tag <></> is shorthand for <Fragment></Fragment> in most cases.
        //In React, a component can't return multiple elements side by side
        //We need to wrap them in something. can use <div> but we don't need No Extra DOM Nodes
        <>
            <div className="cart-icon-wrapper" onClick={toggleCart}>
                <span className="cart-icon">🛒</span>
                {cartCount > 0 ? <span className="cart-count">{cartCount}</span> : null}
            </div> 

            <div className={`cart-sidebar ${IsOpen ? 'open' : ''}`}>
                {/* className={`cart-sidebar ${isOpen ? 'open' : ''} === Creates the sliding panel that contains cart contents
                Uses a conditional CSS class to control its visibility */}
                <div className="cart-header">
                    <h3>Your Cart ({cartCount} items)</h3>
                    <button className="close-cart" onClick={toggleCart}>&times;</button> 
                    {/* &times==for the ×(cross) symbol */}
                </div>

                <div className='cart-items'>
                    {cartItems.length === 0 ? (<p className="empty-cart-message">Your cart is empty</p>):(
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details"> 
                                    <h4>{item.name}</h4>
                                    <p>${item.price.toFixed(2)} * {item.quantity}</p>
                                </div>
                                <button
                                    className="remove-item-btn"
                                    onClick={() => removeFromCart(item.id)}
                                > 
                                    &minus;
                                    {/* //minus sign (–).  */}
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <p>Total:<span>${cartTotal.toFixed(2)}</span></p>
                        </div>
                        <div className="cart-actions">
                            <button className="checkout-btn">Checkout</button>
                            <button className="clear-cart-btn" onClick= {clearCart}> ClearCart</button>

                        </div>
                    </div>
                )}
            </div> 
            {/* Creates a semi-transparent overlay behind the cart when it's open
                Clicking it closes the cart 
                Visually indicates that the main content is temporarily inaccessible */}
            {IsOpen && <div className="cart-overlay" onClick={toggleCart}></div>}  
        </>
    );
};
export default Cart;