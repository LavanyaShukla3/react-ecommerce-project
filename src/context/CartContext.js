import React, {createContext, useContext, useReducer} from 'react';

// Props are arguments passed into React components. Props are passed to components via HTML attributes. props stands for properties.
//The syntax <ChildComponent /> in React is JSX syntax for rendering a component.

// createContext: A function that creates a new Context object, which is like a special container for data that can be accessed by many components.
// To avoid "prop drilling" - passing props through many components that don't need them just to reach a deeply nested component that does.
// Use case: When you need to share data between components without passing props through every level.

// useContext: A hook that lets you use the data stored in a Context.
// It's the easiest way to consume Context data in a functional component.
// Use case: When a component needs to read data from a Context that was created with createContext.

// useReducer: A hook for managing more complex state logic in React components. is an alternative to useState. It is particularly useful when the next state depends on the previous one or when there are multiple sub-values within the state.
// Use case: When your state logic involves multiple sub-values or when the next state depends on the previous state.
// A reducer function is a pure function that takes the current state and an action as input and returns a new state.
// It should not modify the existing state directly but create a new state object.

// createContext creates our shopping cart "container" that can be accessed anywhere in the app
// useReducer manages the complex cart logic (adding, removing, updating items)
// useContext lets any component easily access and update the cart data

// Create context
const CartContext = createContext();

// Initial state
const initalState = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

// Reducer function 
// function counterReducer(state, action) {
//     state: The current state of your cart (items, count, total)
//     action: An object that describes what change to make

const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_CART':{
//             Gets the product data from action.payload
//             payload is just a common name for the data sent with an action
//             In this case, it's the product object the user wants to add to cart
            const product = action.payload;
            //Checks if this product is already in the cart
            const existingItemIndex = state.cartItems.findIndex(
                item => item.id === product.id // function that checks if the IDs match
            );

            if(existingItemIndex>=0){ // If existingItemIndex is 0 or greater, we found the product in the cart
                // If item already exists,Now we need to increase its quantity instead of adding a duplicate
                //Creates a new copy of the cart items array using the spread operator (...)

                // in React, we never modify state directly
                // This creates a new array with all the same items as the original
                const updatedItems = [...state.cartItems];
                
                //Updates the item at the found index
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],//copies all properties of the existing item
                    quantity: updatedItems[existingItemIndex]+1 //Then we override just the quantity property, increasing it by 1
                };
                //Returns a completely new state object with
                return{
                    ...state, // - all properties from the original state
                    cartItems: updatedItems, //our updated cart items array
                    cartCount: state.cartCount+1,// total item count increased by 1
                    cartTotal:  state.cartTotal + product.price //total price increased
                };
            }else{
                return{
                    //A reducer function always needs to return the new version of the state. This becomes the updated state in your application.
                    //...state says "take all the properties from the current state object and copy them into this new object I'm creating."
                    //spread operator ( ... ) allows us to quickly copy all or part of an existing array or object into another array or object.
                    ...state,
                    //The quantity property comes from the cart item objects themselves. When an item is first added to the cart, it gets a quantity property:
                    cartItems: [...state.cartItems, {...product, quantity: 1}], //Override cartItems with our new value
                    cartCount: state.cartCount+1, //Override cartCount
                    cartTotal:  state.cartTotal + product.price // Override cartTotal
                };
            }
            
        }
        case 'REMOVE_FROM_CART':{
            const productId = action.payload;
            const existingItem = state.cartItems.find(item => item.id === productId);
            if (!existingItem) return state;

            if(existingItem.quantity === 1){
                // Remove item completely if quantity is 1
                return {
                    ...state,
                    cartItems: state.cartItems.filter(item => item.id !== productId), 
                    cartCount: state.cartCount-1,
                    cartTotal:  state.cartTotal - existingItem.price 
                };
            }else{
                //Decrease quantity if more than 1
                return {
                    ...state,
                    //map() method allows you to run a function on each item in the array, returning a new array as the result. 
                    //Is this the item we want to modify? (does its ID match the productId we're removing?)
                    // If yes, return a modified version of the item with reduced quantity
                    // If no, return the item unchanged

                    //{ ...item, quantity: item.quantity - 1 } - For the matching item:
                    // ...item copies all properties from the original item
                    // quantity: item.quantity - 1 overrides the quantity property, reducing it by 1
                    cartItems: state.cartItems.map(item => item.id === productId? {...item, quantity:item.quantity-1}: item), 
                    cartCount: state.cartCount-1,
                    cartTotal:  state.cartTotal - existingItem.price 
                };
            }
        }
        case 'CLEAR_CART':
            return initalState;
        default:
            return state;    
    }
};


export const CartProvider = ({children}) => {
    //children is a special prop in React that represents whatever is inside a component's opening and closing tags
    //The curly braces {} use destructuring to extract the children prop directly

    const[state, dispatch] = useReducer(cartReducer,initalState);
    //state: The current state of the cart (items, count, total)
    //dispatch: A function to send actions to the reducer

    //Actions
    const addToCart = (product) =>{
        dispatch({type: 'ADD_TO_CART', payload:product});
    };
    // When adding an item to the cart, we need the complete product object because:
    // First-Time Information: If this is the first time adding this product, we need all its details:
        // Name, Price, Image, Description, Any other product properties
    // Complete Data for Display: The cart needs to show product details like name, price, and image.
    // Price for Calculations: We need the price to calculate the new cart total.

    const removeFromCart = (productId) =>{
        dispatch({type: 'REMOVE_FROM_CART', payload:productId});
    };
    //When removing an item from the cart, we only need the ID because: We only need to identify which product to remove or decrement - the ID uniquely identifies it.
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };
    return (
        // CartContext.Provider: This is a special component created when we set up our Context with createContext(). It creates the "data bubble" mentioned above.
        <CartContext.Provider value= {{
            ...state,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children} {/* children: All the components that are wrapped by our CartProvider. They'll have access to the cart data. */}
        </CartContext.Provider >
    );
};

// Custom hook to use cart context
export const useCart = () => {
    //This creates a custom hook called useCart that:
    // Gets the cart data from our Context
    const context = useContext(CartContext);
    //Checks if it's being used correctly
    //Returns all the cart state and functions
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// CartProvider: Creates the "radio station" that broadcasts cart data
// useCart: Creates the "radio receiver" that components use to tune in
