/* eslint-disable react/react-in-jsx-scope */
import '/src/styles/index.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/Auth.jsx'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase/config.js'

export function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const { auth } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const db = getFirestore(app);

    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible);
    }

    const navigateToLogin = () => {
        navigate('/login');
    }

    const validatePassword = (pwd) => {
        const minLength = pwd.length >= 6;
        const hasUppercase = /[A-Z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasSpecial = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(pwd);
        return minLength && hasUppercase && hasNumber && hasSpecial;
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!password.trim() || !email.trim() || !confirmPassword.trim()) {
            setError("Complete todos los campos.");
            setLoading(false);
            return;
        }

        setError('');
        setLoading(true);

        if (password != confirmPassword) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setError("La contraseña no cumple con los requisitos");
            setLoading(false);
            return;
        }

        try {
            const userCrendential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCrendential.user;

            sendEmailVerification(user);

            await setDoc(doc(db, 'usuarios', user.uid), {
                email: email,
                createdAt: new Date(),
                uid: user.uid,
                emailVerified: false
            });

            await auth.signOut();

            navigate('/login', {
                state: {
                    mensaje: "Cuentra creada con éxito! Asegúrese de validar su correo."
                }
            });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("Este correo ya ha sido registrado. Usa otro.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='register-page'>
                <div className="contenedor">
                    <header className='header-register'>
                        <div className='encabezado-register'>
                            <img className="logos" src="/logo-negro.png" alt="Logo negro para registro" />
                            <strong className="titulos">Crear Cuenta</strong>
                            <span className="subtitulos">Unete al equipo</span>
                        </div>
                    </header>

                    <form className="forms" onSubmit={handleRegister}>
                        <div className='input-register-mail'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="email" placeholder='Correo Electrónico ' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-register-password'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>

                            <input type={isVisible ? "text" : "password"} placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='input-confirm-password'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>

                            <input type={isVisible ? "text" : "password"} placeholder='Confirmar Contraseña' onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className='mostrar-password'>
                            <input type="checkbox" className="checkbox-mostrar" onClick={togglePasswordVisibility} />
                            <label className='checkbox-text'>Mostrar contraseñas</label>
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
                        <button className='boton-crear-cuenta' type="submit" disabled={loading}>{loading ? "Creando..." : "Crear Cuenta"}</button>
                    </form>

                    <div className="links-login">
                        <span onClick={navigateToLogin} className="link-login">¿Ya tienes una cuenta? Iniciar Sesión</span>
                    </div>
                </div>
            </div>
        </>
    )
}