import { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
const token = process.env.NEXT_PUBLIC_API_STRAPI;

console.log("hace fetch")

const options = {
    cache: 'no-store',
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

const fetchGarajes = () => {
    return fetch('http://127.0.0.1:1337/api/garages', options)
        .then(res => res.json())
}



function Garajes() {

    const [garajes, setGarajes] = useState([]);

    useEffect(() => {
        const getGarajes = async () => {
            const garajesData = await fetchGarajes();
            console.log(garajesData.data);
            setGarajes(garajesData.data); // Actualiza el estado con los datos de los garajes
        };
        getGarajes();
    }, []);

    return (
        <div>
            <h1>Lista de Garajes</h1>
            <ul>
            {garajes.data.map(garage => (
                <div key={garage.id}>
                    <p>{garage.id}</p>
                    <p>{garage.attributes.vehiculo}</p>
                    <p>{garage.attributes.tamano}</p>
                    <p>{garage.attributes.direccion}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default withPageAuthRequired(Garajes);





