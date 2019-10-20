import React from 'react';
import './styles/App.sass';
import WelcomePage from './pages/WelcomePage';
import IndexPage from './pages/IndexPage';
import ArtistShowPage from './pages/ArtistShowPage';
import AlbumShowPage from './pages/AlbumShowPage';

function App() {
  return (
    <div className="App">
      {
        // <WelcomePage />
        // <IndexPage />
        // <ArtistShowPage />
        <AlbumShowPage />
      }
    </div>
  );
}

export default App;
