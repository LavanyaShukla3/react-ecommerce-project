import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products'; 
import LoadingSpinner from '../components/LoadingSpinner';
import ProductList from '../components/ProductList';

//useParams is a hook in React Router that allows you to access route parameters from the current URL. 
//useNavigate is a hook that gives you a function that you can use in your code to go to another page.

const ProductDetailPage = () => {
   
    const { id } = useParams();  // uses object destructuring to extract just the id parameter
    const navigate = useNavigate(); // stores this function in a variable called navigate -> How to navigate between pages (from useNavigate)
    const { addToCart } = useCart(); // extracts just the addToCart function from all the cart data
    const [Loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    
    // useEffect -> automatic action that runs at specific times.
    // why useEffect ->
// Run code when a component first appears on screen
// Run code when certain data changes :exmaple React to changes in the URL or product ID
// Clean up (like canceling timers) when a component disappears

// useEffect(() => {
//      Code to run
//   }, [dependencies]);
// A function with the code you want to run
// A "dependency array" that controls when the code runs

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            // Add a check to ensure products exists
            if (products) {
              const foundProduct = products.find(p => p.id === parseInt(id));
              setProduct(foundProduct);
            }
            setLoading(false);
          }, 500);

    },[id]); // Dependency on id - run when product ID changes

    const handleAddToCart = () => {
        addToCart(product);
        setAddedToCart(true);

        setTimeout( ()=>{
            setAddedToCart(false);
        }, 2000);
    };
    if(Loading){
        return <LoadingSpinner />;
    }
  // Handle case where product is not found
    if (!product) {
        return (
        <div className="product-not-found">
            <h2>Product Not Found</h2>
            <p>Sorry, the product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
        );
    }
    // Get related products (same category, excluding current product)
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,4);

    return(
    <div className="product-detail-page">
        {/* navigate(-1) is equivalent to hitting the back button. */}
        <button className="back-button" onClick={() => navigate(-1)}>
            &larr; Back
        </button>
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img src={product.image} alt = {product.name} />
            </div>

            <div className="product-detail-info">   
                <h1>{product.name}</h1>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="product-rating">Rating: {product.rating}/5</div>
                <p className="product-stock">In Stock: {product.stock}</p>

                <p className="product-description">{product.description}</p>

                <div className='product-actions'>
                    <button
                        className="add-to-cat-btn"
                        onClick={ () => addToCart(product)}
                    >{addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}</button>
                </div>
            </div>
        </div>
{/* 
        <div className="product-additional">
        <h2>Additional Information</h2>
        <div className="product-tabs">
          <div className="tab-headers">
            <button className="active">Description</button>
            <button>Specifications</button>
            <button>Reviews</button>
          </div>
          <div className="tab-content">
            <p>{product.description}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
               Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec 
               aliquam nisl nisl sit amet nisl.</p>
          </div>
        </div>
      </div> */}
      {relatedProducts.length > 0 && ( <div className="related-products"> <h2>Related Products</h2> <ProductList products={relatedProducts} />
       </div>
    )}  
    </div>
    );
};
export default ProductDetailPage;
// The useParams() hook doesn't get the ID from component parameters (props) - it gets it directly from the URL through React Router's internal system.
// Here's how it works:
// React Router Creates a Context.
// When your app loads, React Router sets up a special Context that tracks information about the current route
// This Context includes all URL parameters.
// URL Parameters Are Extracted
// When a URL like /products/3 matches your route pattern /products/:id
// React Router extracts the 3 and stores it as id in its internal Context