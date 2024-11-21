import React, { useState, useEffect } from 'react';

function ModalEditarTurno({ setModalEditar, turnos, editarTurno }) {
    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        tramite: '',
        asignacion: '',
    });

    // Cargar los datos del turno cuando se abra el modal
    useEffect(() => {
        if (turnos) {
            setPersona({
                nombre: turnos.datos.nombre,
                apellido: turnos.datos.apellido,
                tramite: turnos.datos.tramite,
                fecha: turnos.datos.fecha,
            });
        }
    }, [turnos]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersona({
            ...persona,
            [name]: value,
        });
    };

    const handleGuardar = () => {
        editarTurno(persona);
        setModalEditar(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
                <h3 className="text-center font-semibold">Editar turno</h3>
                <form className="max-w-md mx-auto my-8 font-black ">
                    <div className="mb-4">
                        <label className="block text-black-900 text-sm font-black mb-2">
                            Nombre
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black-500 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ingresa el nombre"
                            name="nombre"
                            value={persona.nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black-900 text-sm font-black mb-2">
                            Apellido
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black-500 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ingresa el apellido"
                            name="apellido"
                            value={persona.apellido}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black-900 text-sm font-black mb-2">
                            Observaciones
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="observaciones"
                            name="tramite"
                            value={persona.tramite}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black-900 text-sm font-black mb-2">
                            Fecha
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="fecha"
                            type="date"
                            value={persona.fecha}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex justify-center space-x-3">
                        <button
                            type="button"
                            className="rounded-md border border-radius border-black bg-green-700 text-white p-2 mt-2 hover:bg-green-800"
                            onClick={handleGuardar}
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="rounded-md border border-radius border-black bg-red-500 text-white p-2 mt-2 hover:bg-red-700"
                            onClick={() => setModalEditar(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditarTurno;
