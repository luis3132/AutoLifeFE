import { useState } from "react";
import DetailsSST from "./detailsSST";

export default function Historialtm({ seguro, token }) {
    const [ver, setVer] = useState(false)
    return (
        <>
            <tr>
                <td className="py-1 px-4 border-b">{seguro.dateStart} </td>
                <td className="py-1 px-4 border-b">{seguro.dateFinish} </td>
                <td className="py-1 px-4 border-b">{seguro.kilometraje} </td>
                <td className="py-1 px-4 border-b">
                    <button className="bg-blue-500 text-white px-2 rounded" onClick={() => {setVer(!ver)}} >
                        Acción
                    </button>
                </td>
            </tr>
            {ver && <DetailsSST seguro={seguro} closecomponent={()=> {setVer(!ver)}} token={token} tipo={"tecnicomecanica"} />}
        </>
    )
}