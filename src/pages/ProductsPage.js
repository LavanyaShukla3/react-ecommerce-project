import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import products from '../data/products';

// The useState hook is used to manage state in React. State is simply data that can change over time. 
// The useState hook lets us create a state variable, initialize it with data and also gives us access to a setter function that lets us update this state.
const ProductsPage = () => {
    const [filteredProducts, setfilteredProducts] = useState(products);
    const[searchTerm, setSearchTerm] = useState('');

    //const [state, setState] = useState(initialValue)
    // state is the state variable.
    // setState is the setter function that lets us update the state variable, triggering React to re-render the component.
    // initialValue is the value we use to initialize the state variable.
 
    // Categories from our products
    const categories = [...new Set(products.map(p => p.category))];

//     products.map(p => p.category):
//     Takes the products array and extracts just the category property from each product
//     Returns a new array containing only the category names
    
//     [...new Set()]:
//     The spread operator (...) converts the Set back into an array
//     This gives us an array of unique categories

//     We don't have duplicate category buttons
//      If we add new product categories in the future, the filter buttons will automatically update
    
    //Handle search input
    const handleSearch = (e) =>{
        //e captures the event object from the input field
        //JavaScript Events are actions or occurrences that happen in the browser. They can be triggered by various user interactions or by the browser itself.
        //event.target:Refers to the actual element that triggered the event — the deepest element the user interacted with.
        //content of the input field, it triggers the input event. We can retrieve the value of the input by using the event.target.value property.

        const term = e.target.value;
        //updates the component's state with the current search term
        setSearchTerm(term);

        if(term.trim() == ''){
            setfilteredProducts(products);
        }else{
            //products.filter() creates a new array containing only products that match the criteria
            //The filter checks if either the product name OR description contains the search term
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(term.toLowerCase()) ||
                product.description.toLowerCase().includes(term.toLowerCase())
            );
            //setFilteredProducts(filtered) updates the state with only the matching products
            setfilteredProducts(filtered);
        }
    };
    //Handle category filter
    const filterByCategory = (category) =>{
        if(category == 'all'){
            setfilteredProducts(products);
        }else{
            const filtered = products.filter(product => product.category == category);
            setfilteredProducts(filtered);
        }
    };
    return(
        <div className='products-page'>
            <h1>All Products</h1>
            <div className = "filters">
                <div className = "search-bar">
                    <input 
                    type="text"
                    placeholder = "Search products..."
                    //value: A string.
                    value={searchTerm}
                    //onChange: An Event handler function. Required for controlled inputs. Fires immediately when the input’s value is changed by the user 
                    onChange={handleSearch}
                    />
                </div>
                <div className="category-filters">
                    {/* These buttons need keys because they're created dynamically in a loop using map()
                    Multiple buttons of the same type are being created as siblings
                    React needs the key to identify each button uniquely when updates happen */}

                    <button onClick={()=> filterByCategory('all')}>All</button>
                    {categories.map(category => (
                        <button 
                        key={category}
                        onClick={()=> filterByCategory(category)}>
                            {category.charAt(0).toUpperCase()+category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {/* //Conditional Rendering Based on State:
            //The ProductList  displays products based on the filteredProducts state,*/}
            <ProductList products={filteredProducts} /> 
        </div>
    );
};
export default ProductsPage;