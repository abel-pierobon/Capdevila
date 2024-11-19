import { db } from './db/datos';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import VerDisponibles from './VerDisponibles';

function Disponibles() {
    const [dataDisponibles, setDataDisponibles] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loadingTime, setLoadingTime] = useState('');
    const [fecha, setFecha] = useState('');
    const [busqueda, setBusqueda] = useState('');

    // Función para cargar todos los turnos o filtrarlos por fecha
    const cargarTurnos = () => {
        const turnosCollection = collection(db, 'turnos');
        let q = query(turnosCollection);

        // Si hay una fecha seleccionada, añadimos la condición de filtro
        if (fecha) {
            q = query(turnosCollection, where('datos.fecha', '==', fecha));
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const aux = querySnapshot.docs.map((doc) => {
                const turno = doc.data();
                turno.id = doc.id;
                return turno;
            });

            setDataDisponibles(aux);

            const now = new Date();
            const formattedTime = now.toLocaleTimeString();
            setLoadingTime(formattedTime);
        });

        return unsubscribe;
    };

    useEffect(() => {
        const unsubscribe = cargarTurnos();
        return () => {
            unsubscribe();
        };
    }, [fecha]);

    // Filtrado por nombre y apellido
    useEffect(() => {
        if (busqueda.trim() === '') {
            setFilteredData(dataDisponibles);
        } else {
            const search = busqueda.toLowerCase();
            const filtered = dataDisponibles.filter((turno) =>
                `${turno.datos.nombre} ${turno.datos.apellido}`
                    .toLowerCase()
                    .includes(search),
            );
            setFilteredData(filtered);
        }
    }, [busqueda, dataDisponibles]);

    return (
        <div className="grid grid-cols-1">
            {loadingTime && (
                <p className="text-center mb-3">
                    Turnos cargados a las {loadingTime}
                </p>
            )}
            <div className="flex flex-col md:flex-row justify-start items-center space-x-4 mb-6">
                    <h2 className="font-semibold hidden md:block">
                        Filtrar por Nombre y apellido:
                    </h2>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="border border-gray-700 rounded-md p-2"
                        placeholder="Nombre y apellido"
                    />
                    <button
                        onClick={() => setBusqueda('')}
                        className="bg-red-500 text-white p-2 rounded-md"
                    >
                        Limpiar Nombre
                    </button>
                    <h2 className="font-semibold hidden md:block">
                        Filtrar por fecha:
                    </h2>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="border border-gray-700 rounded-md p-2"
                        placeholder="Filtrar por fecha"
                    />
                    <button
                        onClick={() => setFecha('')}
                        className="bg-red-500 text-white p-2 rounded-md"
                    >
                        Limpiar fecha
                    </button>
            </div>

            <section className="grid rid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredData.map((item, i) => (
                    <VerDisponibles key={i} turnos={item} />
                ))}
            </section>
        </div>
    );
}

export default Disponibles;
