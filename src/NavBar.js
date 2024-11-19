import { NavLink, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ContextTurnero } from './ContextTurnero';
import menu from './menu.png';
import Logo from './logo.jsx';
function NavBar() {
    const { usuario, updateUsuario } = useContext(ContextTurnero);
    const [desplegar, setDesplegar] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userDisplayName');
        localStorage.removeItem('userEmail');
        updateUsuario(false);
    };
    const handleToggleMenu = () => {
        setDesplegar(!desplegar);
    };
    return (
        <div className="flex justify-between font-bold shadow-md shadow-gray-700 rounded-b-3xl rounded-t-sm mx-1 nav">
            <NavLink to={'/'}>
                <Logo />
            </NavLink>
            <div
                className={`flex items-center burger`}
                onClick={handleToggleMenu}
            >
                <button className="menu">
                    <img
                        src={menu}
                        alt="menu hamburguesa"
                        className="w-16 flex justify-end"
                    />
                </button>
                {!usuario ? null : (
                    <div className={`${desplegar ? 'abierto' : 'cerrado'}`}>
                        <NavLink to={'/'} className="mx-6 text-xl p-2 ">
                            Inicio
                        </NavLink>

                        <>
                            <NavLink
                                to={'/carga'}
                                className="mx-6 text-xl p-2  "
                            >
                                Cargar turno
                            </NavLink>
                            <Link
                                onClick={handleLogout}
                                className="mx-6 text-xl p-2"
                            >
                                Cerrar Sesión
                            </Link>
                        </>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;
