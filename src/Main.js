import Carga from './Carga';
import Disponibles from './Disponibles';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import { useContext } from 'react';
import { ContextTurnero } from './ContextTurnero';

function Main() {
    const { usuario } = useContext(ContextTurnero);

    // Función para verificar la autenticación del usuario
    const verificarAutenticacion = (componente) => {
        if (usuario) {
            return componente;
        } else {
            // Si no hay usuario autenticado, redirigir a la página de inicio de sesión
            return <Login />;
        }
    };

    return (
        <main className="p-2 grow mx-10 fondoMain ">
            <Routes>
                <Route path="/" element={<Disponibles />} />
                <Route
                    path="/carga"
                    element={verificarAutenticacion(<Carga />)}
                />
                <Route
                    path="/disponibles"
                    element={verificarAutenticacion(<Disponibles />)}
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </main>
    );
}

export default Main;
