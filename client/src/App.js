import React from 'react';
import Home from './Router/Home';
import FormHook from './API/FormHook/FormHook';
import Register from './JWT/Register';

export const AuthContext = React.createContext(); // added this

function App() {
  return (
    // <AuthContext.Provider>
    <div className="App container mt-5">
      <Home/>
      <hr/>
      <FormHook />
      {/* <Register /> */}
      <hr/>
    </div>
    // {/* </AuthContext.Provider> */}
  );
}

export default App;
