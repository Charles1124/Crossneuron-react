import { useLocation, useNavigate } from 'react-router-dom';
import '/src/styles/index.css'
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../firebase/Auth.jsx';
import { signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../firebase/config.js';

export function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    const location = useLocation();
    console.log(location);
    const [isVisible, setIsVisible] = useState(false);
    const mensaje = location.state?.mensaje;
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError("Complete todos los campos.");
            return;
        }
        setLoading(true);

        try {
            const userCrendential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCrendential.user;

            if (!user.emailVerified) {
                setError("Primero debe verificar su correo.")
                await auth.signOut();
                setLoading(false);
                return;
            }

            navigate('/home');
            alert(`Bienvenido ${user.displayName}`);
        } catch (err) {
            setError('Error al iniciar sesión. Por favor, verifique sus credenciales.');
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = async () => {
        const provider = googleProvider;
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result)

            alert(`Bienvenido ${result.user.displayName}`);
            if (result.user) navigate('/home');
        } catch (error) {
            setError("Error al iniciar sesión con Google");
        }
    }

    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible);
    }

    const navigateToRegister = () => {
        navigate('/register');
    }

    const navigateToForgotPassword = () => {
        navigate('/forgot-password');
    }



    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                navigate(location.pathname, { replace: true });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            <div className='login-page'>
                <div className="contenedor">
                    <header className='header-login'>
                        <div className="encabezado-login">
                            <img className="logos" src="/logo-negro.png" alt="Logo negro para login" />
                            <strong className="titulos">Bienvenido</strong>
                            <span className="subtitulos">Inicia sesión en tu cuenta</span>
                        </div>
                    </header>

                    <form className="forms" onSubmit={handleLogin}>
                        <div className='input-login-mail'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="email" placeholder='Correo Electrónico ' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-login-password'>
                            <input type={isVisible ? "text" : "password"} placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} />
                            <span onClick={togglePasswordVisibility} className='eye-icon'>
                                {isVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                        <path fillRule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                        <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                    </svg>

                                )}
                            </span>
                        </div>
                        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
                        <button className='boton-iniciar-sesion' type="submit" disabled={loading}>{loading ? 'Iniciando...' : 'Iniciar Sesión'}</button>
                        <span className="usuario-creado">{mensaje}</span>
                    </form>

                    <div className='divider-row'>
                        <span className='subtitulos'>O continúa con</span>
                    </div>

                    <div className='social-logins'>
                        <button className='boton-google' onClick={handleGoogleLogin}><img src="/gmail.png" alt="Google Icon" className='img-google'></img>Gmail</button>
                        <button className='boton-apple'><img src="/apple-logo.png" alt="Apple Icon" className='img-apple'></img>Apple</button>
                    </div>

                    <div className='links-login'>
                        <span onClick={navigateToRegister}>Registrarse</span>
                        <span onClick={navigateToForgotPassword}>¿Has olvidado tu contraseña?</span>
                    </div>
                </div>
            </div>
        </>
    )
}