

export default function Historialss({seguro}) {
    return (
        <>
            <tr>
                <td className="py-2 px-4 border-b">{seguro.dateStart} </td>
                <td className="py-2 px-4 border-b">{seguro.dateFinish} </td>
                <td className="py-2 px-4 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        Acción
                    </button>
                </td>
            </tr>
        </>
    );
}