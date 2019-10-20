import React from 'react';
import './App.sass';
import WelcomePage from './pages/WelcomePage';
import IndexPage from './pages/IndexPage';

function App() {
  return (
    <div className="App">
      {
        // <WelcomePage />
        <IndexPage />
      }
    </div>
  );
}

export default App;
