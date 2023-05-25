'use client'
const mapsApi = 'AIzaSyCziTRCAS24xZAsN9cjqhI4w_oUE8velIw'
const token = '6d12f40595883dbaef7e30f2272165df6ba49a7c9a9ad7f1abc3f23ed8980694274daa88d297532c340f8dc875ae5662ce6f51b2fb6103e01fe339e7d206787ec519cf80d76d843735d7fa0ce31f8b66e8998526853846526e96b2db61d4b6db4420f33998059bc2fa2bdfb505a0e6b61fd27fde5bb1bf130ff1fc0fb99e2c06';
import Map from '../components/Map';

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
export default Page;