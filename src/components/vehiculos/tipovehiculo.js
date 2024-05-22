


export default function Tipovehiculo({ tipovehiculo }) {
    return (
        <>
            <option value={tipovehiculo.id} title={tipovehiculo.descripcion}>{tipovehiculo.nombre}</option>
        </>
    )
}