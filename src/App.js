import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

//BrowserRouter (aliased as Router)-> Provides the routing functionality to your app, Must wrap all your routing components
// Routes-> Acts as a container/parent for all your individual Route components. Renders the first Route that matches the current URL
// Route->Defines a mapping between a URL path and a specific React component

function App() {
  return (
    //Both cart state and routing need to be shared across multiple components
    // hence there is Top-Level Wrapping instead on Individual Wrapping
    <CartProvider>
      <Router>
      {/* The React Router system updates the URL without reloading the page
        Based on the new URL, the appropriate component (HomePage or ProductsPage) is rendered */}
      <div className="App">
        {/* <Navbar />: Displays the navigation bar at the top */}
        <Navbar />
        <main className='container'>
        <ErrorBoundary>
          <Routes>
            {/* Maps the root URL to the HomePage component */}
            {/* The default page displayed when nothing is clicked is determined by the root path ("/") route. */}
            {/* This default routing is defined directly in your App component with the Route that has path="/" */}
            <Route path="/" element={<HomePage />} />
            {/* Maps the /products URL to the ProductsPage component */}
            <Route path="/products" element={<ProductsPage />} />
            {/* This line sets up a dynamic route that will display a detailed page for a specific product. It tells React Router: When the URL matches the pattern /products/something, show the ProductDetailPage component" */}
            {/* The colon (:) tells React Router that this part of the URL is dynamic
              Whatever value appears in this position will be captured as a parameter named "id" */}
            <Route path="/products/:id" element={<ProductDetailPage />} />

          </Routes>
          </ErrorBoundary>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
