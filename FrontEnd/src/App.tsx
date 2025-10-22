import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import FilterContextProvider from './contexts/filters/FilterContext';
import CardExpandidoProvider from './contexts/main/CardExpandidoContext';
import InstituicaoAtualProvider from './contexts/main/InstituicaoAtualContext';
import logo from './assets/Logo.png';
import { FaSearch } from 'react-icons/fa';


function App() {
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) setShowTopBar(false);
      else setShowTopBar(true);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`top-bar ${showTopBar ? 'visible' : 'hidden'}`}>
        {}
        <Link to="/home">
          <img src={logo} className="top-bar-logo" />
        </Link>

        {}
          <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="search-input"
          />
        </div>

      </div>

      <FilterContextProvider>
        <InstituicaoAtualProvider>
          <CardExpandidoProvider>
            <div className="app-content">
              <Routes>
                <Route path="/" element={<Navigate to={'/home'} />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </div>
          </CardExpandidoProvider>
        </InstituicaoAtualProvider>
      </FilterContextProvider>
    </>
  );
}

export default App;
