import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';

function Header({ user, onLogout, cartCount = 0 }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogoutClick = () => {
        onLogout();
        setIsMenuOpen(false);
    };

    return (
        <header className='header-component'>
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <h1>SmartPortables</h1>
                </Link>
                
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Cart ({cartCount})
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li className="nav-item">
                                <span className="nav-user">Welcome, {user.name}</span>
                            </li>
                            <li className="nav-item">
                                <button className="nav-logout" onClick={handleLogoutClick}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
                
                <div className="hamburger" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    cartCount: PropTypes.number,
    user: PropTypes.object,
    onLogout: PropTypes.func,
};

export default Header;