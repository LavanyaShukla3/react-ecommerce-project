import React from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

//from 'react'-> It brings in the React object, which contains the core functionality needed to define React components
//from 'react-router-dom'-> This statement imports a specific component (Link) from the React Router DOM library.
//Curly braces indicate we're selectively importing just the Link component
//Default imports (import React from 'react'): Import the default export from a module
//Named imports (import { Link } from 'react-router-dom'): Import specific named exports from a module

//arrow function
const Navbar = () =>{
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                {/* A <Link> is an element that lets the user navigate to another page by clicking or tapping on it */}
                {/* When clicked, it navigates to the specified path (/ in this case, which is the home page) without causing a full page reload */}
                {/* It uses the browser's History API to change the URL without a page reload */}
                <Link to="/">ShopReact</Link>
            </div>
            <div className="navbar-menu">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/products" className="navbar-item">Products</Link>
                <Cart/>
                {/* When we use <Cart /> in the Navbar component, we're using a fundamental React concept called component composition. 
                The <ComponentName /> syntax is how you include one component inside another in React.  
                It sees <Cart />
                It looks for a component called "Cart" (which we imported at the top)
                It renders the Cart component's output at that position
                The Cart component's JSX gets inserted right where <Cart /> appears
                */}
            </div>
        </nav>
    );
};
export default Navbar;