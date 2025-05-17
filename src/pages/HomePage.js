import React from 'react';
import ProductList from '../components/ProductList';
import products from '../data/products';

const HomePage = () =>{
    return(
        <div className="home-page">
            <div className="hero-section">
                <h1>Welcome to ShopReact</h1>
                <p>Discover amazing products at great prices</p>
            </div>
            <div className="featured-products">
                <h2>Featured Products</h2>
                {/* products={...} - This passes data to the component through a prop named "products". */}
                {/* slice() is an array method that extracts a portion of an array without modifying the original
                So this extracts elements at positions 0, 1, 2, and 3 (the first four items) 
                The purpose of this code is to display only a subset of products (specifically the first 4) on the HomePage as "Featured Products," 
                rather than showing all products
                */}
                <ProductList products={products.slice(0,4)} />
            </div>
        </div>
    );
};
//  In <ProductList products={products.slice(0, 4)} />, we don't need to pass a key prop because this is a single component instance, 
//  not a list of components. The key prop is only necessary when 
//  you're rendering multiple sibling components of the same type in a list, typically when using .map(). 
//  Keys help React identify which items have changed, been added, or removed, improving performance and preventing bugs during re-renders.
export default HomePage;

//Remember: The key prop is for helping React manage lists of components, not for passing data between components.


// Example 1 (ProductList): You're not creating multiple instances of ProductList - you're creating one instance and passing it some data.
// Example 2 (map of ProductCards): You're creating multiple instances of ProductCard components, all at the same level in the component tree.
//Keys are React's way of identifying individual items in a list when you have multiple components of the same type as siblings.