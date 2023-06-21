'use client'
import Map from '../components/map';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

/*
const fetchGarages  = () =>  {
    return fetch('http://127.0.0.1:1337/api/garages', 
    {
        
        cache: 'no-store',
        headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
    .then (res => res.json())
}


/*async function Driver() {

    const garages = await fetchGarages()
    console.log(garages.data)
  return (
    <main>
      <div >
         {garages.data.map(garage => (
            <div key={garage.id}>
                <p>{garage.id}</p>
                <p>{garage.attributes.vehiculo}</p>
                <p>{garage.attributes.tamano}</p>
                <p>{garage.attributes.direccion}</p>
                <br/>
            </div>
*/

const Page = () => {
  const address = 'Torrellano, 03320, av illice 5';
  return (
    <div>
      <Map address={address} />
    </div>
  );
};
export default withPageAuthRequired(Page);