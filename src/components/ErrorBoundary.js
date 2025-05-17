import React, { Component } from 'react';

class ErrorBoundary extends Component{
    //This runs when a new instance of ErrorBoundary is created
    constructor(prop){
        super(prop);

// The constructor initializes state with three properties:
// hasError: Tracks whether an error has occurred (initially false)
// error: Will store the error object if one occurs
// errorInfo: Will store additional information about the error

        this.state = { hasError: false, error: null, errorInfo: null};
    }
    
    //Error Catching Method 1: getDerivedStateFromError
    // A descendant component is any component that's nested inside another component, at any level of depth.
    // getDerivedStateFromError -> When any descendant component throws an error (crashes), this method springs into action
    static getDerivedStateFromError(error){
        // Update state so the next render will show the fallback UI.
        return { hasError: true};
    }

    //Error Catching Method 2: componentDidCatch
    componentDidCatch(error, errorInfo){
        // You can also log the error to an error reporting service
        //Log the error to the console
    //Update the state with the actual error and its details
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }
    render(){
        if(this.state.hasError){
               // You can render any custom fallback UI
            return(
                <div className="error-boundary">
                    <h2>Something went wrong.</h2>
                    <p>We're sorry- we're not able to display this part of the application right now.</p>
                    <button onClick={() => window.location.href = '/'}>
                        Return to Home Page
                    </button>
                    <details> 
                        {/* <details> == Specify details that the user can open and close on demand: */}
                        {/* The <summary> tag defines a visible heading for the <details> element. The heading can be clicked to view/hide the details. */}
                        <summary>Error Details</summary>
                        <p>{this.state.error && this.state.error.toString()}</p>
                    </details>
                </div>
            );
        }
        //if hasError is false: Returns this.props.children (the components inside the ErrorBoundary)
        return this.props.children;
    }
}
export default ErrorBoundary;