import React from 'react';
import EmptyLayout from './layouts/empty-layout';
import { useLocation } from 'react-router-dom';
import FilledLayout from './layouts/filled-layout';


function App() {
  const location = useLocation().pathname
 
  const willUseLayout = {
    [location === '/login' || location === '/register' ? location : ''] : EmptyLayout,
    filled: FilledLayout,
  }

  const Layout = willUseLayout[location] || willUseLayout['filled']
   

  return (
    
    <div className="app">
        <Layout/> 
    </div>
    
  );
}

export default App;
