import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './db/datos';
import ModalEliminar from './ModalEliminar';
import ModalEditarTurno from './ModalEditarTurno';
import { useContext } from 'react';
import { ContextTurnero } from './ContextTurnero';

function VerDisponibles({ turnos }) {
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const { usuario } = useContext(ContextTurnero);

    const eliminarTurno = async () => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await deleteDoc(turnoDocRef);
            setModalEliminar(false);
        } catch (error) {
            console.error('Error al eliminar el turno:', error);
        }
    };

    const editarTurno = async (nuevosDatos) => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await updateDoc(turnoDocRef, { datos: nuevosDatos });
            setModalEditar(false);
        } catch (error) {
            console.error('Error al actualizar el turno:', error);
        }
    };
    const marcarAtendido = async () => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await updateDoc(turnoDocRef, { atendido: true });
        } catch (error) {
            console.error('Error al actualizar el turno:', error);
        }
    };
    return (
        <section>
            <div
                key={turnos.id}
                className={`grid md:grid-cols-1 border border-black shadow-xl p-4 rounded-md bg-blue-100'${turnos.atendido ? ' bg-gray-500 opacity-70' : ''} 
                `}
            >
                <div className="flex justify-center items-center space-x-2 font-bold text-xl uppercase ">
                    <p className="text-black">{turnos.datos.apellido}</p>
                    <p className="text-black ">{turnos.datos.nombre}</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-black font-bold">{turnos.datos.fecha}</p>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-black">{turnos.datos.tramite}</p>
                </div>
                {usuario && (
                    <div className="flex flex-col justify-center items-center space-y-2 mt-2">
                        <button
                            className=" bg-blue-500 hover:bg-blue-600 w-[75%] border border-black rounded-md text-white font-semibold hover:font-bold"
                            onClick={() => setModalEditar(true)}
                        >
                            Editar
                        </button>
                        {/* <button
                            className=" bg-blue-500 hover:bg-blue-600 w-[75%] border border-black rounded-md text-white font-semibold hover:font-bold"
                            onClick={() => marcarAtendido()}
                        >
                            Marcar atención
                        </button> */}
                        <button
                            className=" bg-red-500 hover:bg-red-600 w-[75%] border border-black rounded-md text-white font-semibold hover:font-bold"
                            onClick={() => setModalEliminar(true)}
                        >
                            Eliminar
                        </button>
                    </div>
                )}

                {modalEliminar && (
                    <ModalEliminar
                        eliminarTurno={eliminarTurno}
                        setModalEliminar={setModalEliminar}
                    />
                )}
                {modalEditar && (
                    <ModalEditarTurno
                        setModalEditar={setModalEditar}
                        turnos={turnos}
                        editarTurno={editarTurno}
                    />
                )}
            </div>
        </section>
    );
}

export default VerDisponibles;
