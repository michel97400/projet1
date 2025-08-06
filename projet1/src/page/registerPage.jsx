
import FormSchema from '../component/schemaLogin';
import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone, Calendar, Check, X } from 'lucide-react';

function Register() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        password: '',
        confirmPassword: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptNewsletter, setAcceptNewsletter] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!acceptTerms) {
            alert('Vous devez accepter les conditions d\'utilisation');
            return;
        }

        if (Object.keys(errors).length > 0) {
            alert('Veuillez corriger les erreurs dans le formulaire');
            return;
        }

        setIsLoading(true);
        
        // Simulation d'une requête d'inscription
        setTimeout(() => {
            console.log('Données d\'inscription:', { ...formData, acceptTerms, acceptNewsletter });
            setIsLoading(false);
            // logique d'inscription
        }, 2000);
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0:
            case 1: return 'Très faible';
            case 2: return 'Faible';
            case 3: return 'Moyen';
            case 4: return 'Fort';
            case 5: return 'Très fort';
            default: return '';
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0:
            case 1: return '#ef4444';
            case 2: return '#f97316';
            case 3: return '#eab308';
            case 4: return '#22c55e';
            case 5: return '#16a34a';
            default: return '#6b7280';
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Créer un compte</h2>
                    <p>Rejoignez MarketPlace dès aujourd'hui</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form" noValidate>
                    {/* Nom et Prénom */}
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="firstName">
                                Prénom <span className="required" aria-label="requis">*</span>
                            </label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={20} />
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Jean"
                                    required
                                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                                    aria-invalid={errors.firstName ? "true" : "false"}
                                />
                                {errors.firstName && (
                                    <X className="error-icon" size={16} aria-hidden="true" />
                                )}
                                {!errors.firstName && formData.firstName.length >= 2 && (
                                    <Check className="success-icon" size={16} aria-hidden="true" />
                                )}
                            </div>
                            {errors.firstName && (
                                <span className="error-message" id="firstName-error" role="alert">
                                    {errors.firstName}
                                </span>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">
                                Nom <span className="required" aria-label="requis">*</span>
                            </label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={20} />
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Dupont"
                                    required
                                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                                    aria-invalid={errors.lastName ? "true" : "false"}
                                />
                                {errors.lastName && (
                                    <X className="error-icon" size={16} aria-hidden="true" />
                                )}
                                {!errors.lastName && formData.lastName.length >= 2 && (
                                    <Check className="success-icon" size={16} aria-hidden="true" />
                                )}
                            </div>
                            {errors.lastName && (
                                <span className="error-message" id="lastName-error" role="alert">
                                    {errors.lastName}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="input-group">
                        <label htmlFor="email">
                            Email <span className="required" aria-label="requis">*</span>
                        </label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="jean.dupont@exemple.com"
                                required
                                aria-describedby={errors.email ? "email-error" : undefined}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email && (
                                <X className="error-icon" size={16} aria-hidden="true" />
                            )}
                            {!errors.email && formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                                <Check className="success-icon" size={16} aria-hidden="true" />
                            )}
                        </div>
                        {errors.email && (
                            <span className="error-message" id="email-error" role="alert">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Téléphone et Date de naissance */}
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="phone">Téléphone</label>
                            <div className="input-wrapper">
                                <Phone className="input-icon" size={20} />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="06 12 34 56 78"
                                    aria-describedby={errors.phone ? "phone-error" : undefined}
                                    aria-invalid={errors.phone ? "true" : "false"}
                                />
                                {errors.phone && (
                                    <X className="error-icon" size={16} aria-hidden="true" />
                                )}
                            </div>
                            {errors.phone && (
                                <span className="error-message" id="phone-error" role="alert">
                                    {errors.phone}
                                </span>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="birthDate">
                                Date de naissance <span className="required" aria-label="requis">*</span>
                            </label>
                            <div className="input-wrapper">
                                <Calendar className="input-icon" size={20} />
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    required
                                    max={new Date().toISOString().split('T')[0]}
                                    aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
                                    aria-invalid={errors.birthDate ? "true" : "false"}
                                />
                                {errors.birthDate && (
                                    <X className="error-icon" size={16} aria-hidden="true" />
                                )}
                            </div>
                            {errors.birthDate && (
                                <span className="error-message" id="birthDate-error" role="alert">
                                    {errors.birthDate}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Mot de passe */}
                    <div className="input-group">
                        <label htmlFor="password">
                            Mot de passe <span className="required" aria-label="requis">*</span>
                        </label>
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
                                aria-describedby="password-strength password-help"
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('password')}
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {formData.password && (
                            <div className="password-strength" id="password-strength">
                                <div className="strength-bar">
                                    <div 
                                        className="strength-fill" 
                                        style={{ 
                                            width: `${(passwordStrength / 5) * 100}%`,
                                            backgroundColor: getPasswordStrengthColor()
                                        }}
                                    ></div>
                                </div>
                                <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                                    {getPasswordStrengthText()}
                                </span>
                            </div>
                        )}
                        <div className="password-help" id="password-help">
                            <small>Le mot de passe doit contenir au moins 8 caractères, incluant majuscules, minuscules, chiffres et caractères spéciaux.</small>
                        </div>
                        {errors.password && (
                            <span className="error-message" role="alert">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Confirmation mot de passe */}
                    <div className="input-group">
                        <label htmlFor="confirmPassword">
                            Confirmer le mot de passe <span className="required" aria-label="requis">*</span>
                        </label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                                aria-invalid={errors.confirmPassword ? "true" : "false"}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                aria-label={showConfirmPassword ? "Masquer la confirmation" : "Afficher la confirmation"}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {!errors.confirmPassword && formData.confirmPassword && formData.confirmPassword === formData.password && (
                                <Check className="success-icon" size={16} aria-hidden="true" />
                            )}
                        </div>
                        {errors.confirmPassword && (
                            <span className="error-message" id="confirmPassword-error" role="alert">
                                {errors.confirmPassword}
                            </span>
                        )}
                    </div>

                    {/* Conditions d'utilisation */}
                    <div className="checkbox-group">
                        <label className="checkbox-wrapper required-checkbox">
                            <input 
                                type="checkbox" 
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                required
                                aria-describedby="terms-error"
                            />
                            <p>
                                Pour finaliser votre inscription, vous devez accepter les conditions d'utilisation et la politique de confidentialité. Vous pouvez aussi choisir de recevoir des emails promotionnels (facultatif).
                            </p>

                            
                        </label>

                        <label className="checkbox-wrapper">
                            <input 
                                type="checkbox" 
                                checked={acceptNewsletter}
                                onChange={(e) => setAcceptNewsletter(e.target.checked)}
                            />
                            <span className="checkmark"></span>
                            Je souhaite recevoir les newsletters et offres promotionnelles
                        </label>
                    </div>

                    {/* Bouton d'inscription */}
                    <button 
                        type="submit" 
                        className={`register-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading || !acceptTerms || Object.keys(errors).length > 0}
                    >
                        {isLoading ? 'Création du compte...' : 'Créer mon compte'}
                    </button>
                </form>

                {/* Lien vers connexion */}
                <div className="register-footer">
                    <p>
                        Déjà un compte ? 
                        <a href="/login" className="login-link"> Se connecter</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;