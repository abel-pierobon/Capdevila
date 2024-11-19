import React, { createContext, useEffect, useState } from 'react';

const ContextTurnero = createContext();
const { Provider } = ContextTurnero;

function ContextTurneroProvider(props) {
    const [puestoDeAtencion, setPuestoDeAtencion] = useState(() => {
        return localStorage.getItem('puestoDeAtencion') || 'Carnet';
    });

    const [turnoActual, setTurnoActual] = useState('');
    const [usuario, setUsuario] = useState('');

  

    const updateTurnoActual = (data) => {
        setTurnoActual(data);
    };

 
    const updateUsuario = (user) => {
        setUsuario(user);
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userDisplayName = localStorage.getItem('userDisplayName');
        const userEmail = localStorage.getItem('userEmail');

        if (userId && userDisplayName && userEmail) {
            updateUsuario({ uid: userId, displayName: userDisplayName, email: userEmail });
        }
    }, []);

    const [clickButton, setClickButton] = useState('');
    
        
    return (
        <Provider value={{
            turnoActual,
            updateTurnoActual,
            updateUsuario,
            usuario,
            puestoDeAtencion,
            setPuestoDeAtencion,
            clickButton,
            setClickButton,
        }}>
            {props.children}
        </Provider>
    );
}

export { ContextTurnero, ContextTurneroProvider };
