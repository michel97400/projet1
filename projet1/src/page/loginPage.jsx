import * as z from "zod";
import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import LoginSchema from "../component/schemaLogin";


function Login() {
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const result = LoginSchema.safeParse(formData);
        
         if (!result.success) {
        const rawErrors = result.error.issues;
        const fieldErrors = {};

        rawErrors.forEach((issue) => {
        const field = issue.path[0];
        if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
        }
        });

        setErrors(fieldErrors);

        } else {
            setErrors({});
            setIsLoading(false)
            console.log("✅ Données valides :", result.data);
            // Appel backend ici
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Connexion</h2>
                    <p>Connectez-vous à votre compte MarketPlace</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {/* Champ Email */}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="votre.email@exemple.com"
                                required
                            />
                             
                        </div>
                        {errors.email && (
                            <p className="input-error text-danger fw-bold">{errors.email}</p>
                        )}
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="input-group">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                            
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            
                        </div>
                        {errors.password && (
                            <p className="input-error text-danger fw-bold">{errors.password}</p>
                        )}
                    </div>

                    {/* Options */}
                    <div className="login-options">
                        <label className="checkbox-wrapper">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Se souvenir de moi
                        </label>
                        <a href="#" className="forgot-password">
                            Mot de passe oublié ?
                        </a>
                    </div>

                    {/* Bouton de connexion */}
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                {/* Lien vers inscription */}
                <div className="login-footer">
                    <p>
                        Pas encore de compte ? 
                        <a href="#" className="signup-link"> Créer un compte</a>
                    </p>
                </div>

                {/* Séparateur et connexions sociales */}
                <div className="social-login">
                    <div className="separator">
                        <span>ou</span>
                    </div>
                    <div className="social-buttons">
                        <button className="social-btn google">
                            <span>G</span>
                            Continuer avec Google
                        </button>
                        <button className="social-btn facebook">
                            <span>f</span>
                            Continuer avec Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;