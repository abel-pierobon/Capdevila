function ModalEliminar({ setModalEliminar, eliminarTurno }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
                <h3 className="text-center font-semibold">¿Estás seguro que deseas finalizar el trámite?</h3>
                <div className="flex justify-center space-x-3">
                    <button className="rounded-md border border-radius border-black bg-red-500 text-white p-2 mt-2 hover:bg-red-700"
                    onClick={() => eliminarTurno()}>
                        Si finalizar
                    </button>
                    <button className="rounded-md border border-radius border-black bg-green-700 text-white p-2 mt-2 hover:bg-green-800"
                    onClick={() => setModalEliminar(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ModalEliminar;
