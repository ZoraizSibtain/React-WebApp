import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';

function Header({ cartCount = 0 }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='header-component'>
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <h1>SmartPortables</h1>
                </Link>
                
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            Cart ({cartCount})
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Login</a>
                    </li>
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
};

export default Header;