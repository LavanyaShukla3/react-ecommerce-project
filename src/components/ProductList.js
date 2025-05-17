import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({products}) => {
    return(
        <div className='product-list'>
            {/* .map() method is a JavaScript array method that iterates over each item in an array 
            and transforms it into something else, returning a new array with the transformed values.  */}
            {/* The arrow function product => (...) takes each product object as its parameter
                For each product, it returns a ProductCard component */}
            {products.map(product =>(
                <ProductCard key = {product.id} product={product} />
            ))}
        </div>
    );
};
//  key={product.id}: React needs a unique identifier for each item in a list to efficiently update the DOM
// We're using the product's ID as this unique key
// This is not accessible inside the component as a regular prop, it's used internally by React

// Remember: The key prop is for helping React manage lists of components, not for passing data between components. 

// product={product}:
// This passes the entire product object to the ProductCard component as a prop named "product"
// Inside the ProductCard component, we can access this data through the destructured { product } parameter
export default ProductList;