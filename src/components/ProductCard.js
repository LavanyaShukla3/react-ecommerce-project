import React from 'react';
import {Link} from 'react-router-dom';
import {useCart} from '../context/CartContext';

//The curly braces are using JavaScript destructuring assignment to extract the product property from the props object passed to the component.
//This is equivalent to writing:
// const ProductCard = (props) => {
//    const product = props.product;
    // ...

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`} className="product-link">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className='product-info'>
                <h3 className='product-name'>{product.name}</h3>
                {/* toFixed() method converts a number to a string. */}
                <p className='product-price'>${product.price.toFixed(2)}</p>
                <div className='product-rating'>Rating:{product.rating}/5</div>
            </div>
            </Link>
             <div className="product-card-footer">
                <button 
                 className="add-to-cart-btn"
                onClick={(e) => {
                     e.preventDefault();
                    addToCart(product);
                }}
                >
                Add to Cart
                </button>
                </div>
            </div>
    );
};
export default ProductCard;