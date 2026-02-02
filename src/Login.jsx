import './main-pages.css'
import { useState } from 'react';

export function Login() {

    const [isVisible, setIsVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div className="contenedor">
            <header className='header-login'>
                <div className="encabezado-login">
                    <img className="logos" src="/logo-negro.png" alt="Logo negro para login" />
                    <strong className="titulos">Bienvenido</strong>
                    <span className="subtitulos">Inicia sesión en tu cuenta</span>
                </div>
            </header>

            <form className="forms">
                <div className='input-login-mail'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" placeholder='Correo Electrónico ' />
                </div>
                <div className='input-login-password'>
                    <input type={isVisible ? "text" : "password"} placeholder='Contraseña' />
                    <span onClick={togglePasswordVisibility} className='eye-icon'>
                        {isVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                <path fillRule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                                <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clip-rule="evenodd" />
                                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                            </svg>

                        )}
                    </span>
                </div>
                <button className='boton-iniciar-sesion'>Iniciar Sesión</button>
            </form>

            <div className='divider-row'>
                <span className='subtitulos'>O continúa con</span>
            </div>

            <div className='social-logins'>
                <button className='boton-google'><img src="/gmail.png" alt="Google Icon" className='img-google'></img>Gmail</button>
                <button className='boton-apple'><img src="/apple-logo.png" alt="Apple Icon" className='img-apple'></img>Apple</button>
            </div>

            <div className='links-login'>
                <span>Registrarse</span>
                <span>¿Has olvidado tu contraseña?</span>
            </div>
        </div>
    )
}