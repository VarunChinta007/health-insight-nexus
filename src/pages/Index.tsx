
import React from 'react';
import Home from "./Home";

const Index = () => {
  // Adding a useEffect to ensure smooth page transitions with a fade-in animation
  React.useEffect(() => {
    // This could be expanded to include more complex animations or loading states
    document.body.classList.add('fade-in-animation');
    
    return () => {
      document.body.classList.remove('fade-in-animation');
    };
  }, []);

  return <Home />;
};

export default Index;
