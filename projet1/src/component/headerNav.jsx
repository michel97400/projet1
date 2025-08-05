import { useState } from 'react'
import { Link } from "react-router-dom";
import { User, Power, Menu, X } from 'lucide-react';

function HeaderComposant() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const closeMenus = () => {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
    };

    // Gestion des touches clavier pour les menus
    const handleKeyDown = (event, action) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
        if (event.key === 'Escape') {
            closeMenus();
        }
    };

    return (
        <header className='headernav' role="banner">
            {/* Logo/Titre avec lien vers accueil */}
            <div className='title-page'>
                <Link 
                    to="/" 
                    className="logo-link"
                    aria-label="MarketPlace - Retour à l'accueil"
                >
                    <h1>MarketPlace</h1>
                </Link>
            </div>

            {/* Bouton menu mobile */}
            <button 
                className="mobile-menu-toggle"
                onClick={toggleMenu}
                onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
                aria-expanded={isMenuOpen}
                aria-controls="main-navigation"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Navigation principale */}
            <div 
                className={`link-header-div ${isMenuOpen ? 'menu-open' : ''}`}
                id="main-navigation"
            >
                <nav role="navigation" aria-label="Navigation principale">
                    <ul className='link-header'>
                        <li>
                            <Link 
                                to="/" 
                                onClick={closeMenus}
                                aria-current={window.location.pathname === '/' ? 'page' : undefined}
                            >
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/boutique" 
                                onClick={closeMenus}
                                aria-current={window.location.pathname === '/boutique' ? 'page' : undefined}
                            >
                                Boutique
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/contact" 
                                onClick={closeMenus}
                                aria-current={window.location.pathname === '/contact' ? 'page' : undefined}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Actions utilisateur */}
                <div className='user-actions' role="toolbar" aria-label="Actions utilisateur">
                    {/* Bouton connexion/profil */}
                    <div className="user-menu-container">
                        <button
                            className='icon-users'
                            onClick={toggleUserMenu}
                            onKeyDown={(e) => handleKeyDown(e, toggleUserMenu)}
                            aria-expanded={isUserMenuOpen}
                            aria-haspopup="menu"
                            aria-controls="user-menu"
                            aria-label="Menu utilisateur"
                        >
                            <User aria-hidden="true" />
                            <span className="sr-only">Profil utilisateur</span>
                        </button>

                        {/* Menu déroulant utilisateur */}
                        {isUserMenuOpen && (
                            <div 
                                className="user-dropdown"
                                id="user-menu"
                                role="menu"
                                aria-labelledby="user-menu-button"
                            >
                                <Link 
                                    to="/login" 
                                    role="menuitem"
                                    onClick={closeMenus}
                                    className="dropdown-item"
                                >
                                    Se connecter
                                </Link>
                                <Link 
                                    to="/register" 
                                    role="menuitem"
                                    onClick={closeMenus}
                                    className="dropdown-item"
                                >
                                    S'inscrire
                                </Link>
                                <Link 
                                    to="/profile" 
                                    role="menuitem"
                                    onClick={closeMenus}
                                    className="dropdown-item"
                                >
                                    Mon profil
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Bouton déconnexion/paramètres */}
                    <button 
                        className='icon2-users'
                        onClick={() => {
                            // Logique de déconnexion ou paramètres
                            console.log('Action déconnexion/paramètres');
                        }}
                        aria-label="Paramètres et déconnexion"
                        title="Paramètres et déconnexion"
                    >
                        <Power aria-hidden="true" />
                        <span className="sr-only">Déconnexion</span>
                    </button>
                </div>
            </div>

            {/* Overlay pour fermer les menus en cliquant à côté */}
            {(isMenuOpen || isUserMenuOpen) && (
                <div 
                    className="menu-overlay"
                    onClick={closeMenus}
                    aria-hidden="true"
                />
            )}
        </header>
    )
}

export default HeaderComposant;