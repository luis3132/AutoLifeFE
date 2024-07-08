
export default function Historiald({dueno}) {
    return (
        <>
            <tr>
                <td className="py-2 px-2 border-b">{dueno.usuario} </td>
                <td className="py-2 px-2 border-b">{dueno.ciudadPromTransi} </td>
                <td className="py-2 px-2 border-b">{dueno.dateStart} </td>
                <td className="py-2 px-2 border-b">{dueno.dateFinish} </td>
                <td className="py-2 px-2 border-b">{dueno.kmStart} </td>
                <td className="py-2 px-2 border-b">{dueno.kmFinish} </td>
            </tr>
        </>
    );
}