
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/main-pages.css';


export function Splash() {

    const navigate = useNavigate();

    useEffect(() => {

        const seenSplash= localStorage.getItem('splash'); 
        if(seenSplash){
            navigate('login'); 
            return; 
        }

        const timer = setTimeout(() => {
            localStorage.setItem('splash', 'true');
            navigate('/login');
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="div1-splash">
                <header className="header-splash">
                    <div className="div2-splash">
                        <img className="img-splash" src="/logo-negro.png" alt="Logo negro" />
                        <strong className="crossneuron-splash">Crossneuron</strong>
                        <span className="trainer-splash">Entrena tu mente</span>
                    </div>
                </header>
            </div>
        </>
    )
}