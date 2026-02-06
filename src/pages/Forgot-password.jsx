/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import '/src/styles/index.css';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../firebase/Auth';

export function ForgotPassword() {

    const [forgotPassword, setForgotPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!forgotPassword.trim()) {
            setError("Complete todos los campos.")
            setLoading(false);
            return;
        }

        setError('');
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, forgotPassword);

            setError("Si el usuario existe, se enviará un correo de recuperación.")

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const navigateToLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <div className='forgot-password-page'>
                <div className="contenedor">
                    <header>
                        <div className="encabezado-login">
                            <img className="logos" src="/logo-negro.png" alt="Logo negro para registro" />
                            <strong className="titulo-recuperar-contraseña">Recuperar Contraseña</strong>
                        </div>
                    </header>

                    <form className="forms" onSubmit={handleForgotPassword}>
                        <div className="input-login-mail">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="email" placeholder="Correo electrónico" onChange={(e) => setForgotPassword(e.target.value)}></input>
                        </div>
                        <div className='requisitos-register'>
                            <strong className='subtitulos'>Requisitos para Contraseña:</strong>
                            <ul>
                                <li>Mínimo 6 caracteres</li>
                                <li>Al menos una mayúscula</li>
                                <li>Al menos un número</li>
                                <li>Al menos un carácter especial</li>
                            </ul>
                        </div>
                        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
                        <button className='boton-recuperar-contraseña' type="submit">Enviar Correo</button>
                    </form>

                    <div className='links-login'>
                        <span onClick={navigateToLogin}>Volver al inicio de sesión</span>
                    </div>
                </div>
            </div>
        </>
    )
}