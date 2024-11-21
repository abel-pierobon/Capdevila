import {  useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './db/datos';
import { toast } from 'sonner';

function Carga() {
    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        tramite: '',
        fecha: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersona({
            ...persona,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar que todos los campos estén completos
        if (!persona.nombre || !persona.apellido || !persona.tramite || !persona.fecha) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        const agregarTurno = collection(db, 'turnos');
        const turno = {
            datos: {
                nombre: persona.nombre,
                apellido: persona.apellido,
                tramite: persona.tramite,
                fecha: persona.fecha,
            },
            fecha: serverTimestamp(),
        };

        addDoc(agregarTurno, turno)
            .then(() => {
                toast.success('Turno cargado correctamente');
                setPersona({
                    nombre: '',
                    apellido: '',
                    tramite: '',
                    fecha: '',
                });
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error al cargar el turno');
            });
    };

    return (
        <div className="formulario">
            <h2 className="flex justify-center text-2xl font-black">
                Completa el formulario para cargar un turno
            </h2>
            <form className="max-w-md mx-auto my-8 font-black" onSubmit={handleSubmit}>
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
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

                <button
                    className="bg-green-600 hover:bg-green-400 text-black font-black border border-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Cargar
                </button>
            </form>
        </div>
    );
}

export default Carga;
