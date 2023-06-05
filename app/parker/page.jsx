'use client';
const token = process.env.API_PLACES;
const tokenStrapi = process.env.API_MAPS;


import React, { useEffect, useState } from "react";
import styles from './../page.module.css'
import usePlacesAutocomplete, {getGeocode, getLatLng } from 'use-places-autocomplete';
import Map from './../components/map';



const Parker = () => {
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [vehiculo, setTipoVehiculo] = useState('Coche');
  const [tamano, setTamaño] = useState('Pequeño (3.6 x 1,6m)');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      vehiculo,
      tamano,
      address,
      latitud,
      longitud
    };
console.log(data)
    try {
      const response = await fetch('http://127.0.0.1:1337/api/garages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStrapi}`
        },
        body: JSON.stringify({data})
      });

      const responseData = await response.json();
      console.log(responseData); // Realiza alguna acción con la respuesta de la API
    } catch (error) {
      console.error(error);
    }
  };

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: 'es',
      }
    },
    debounce: 500,
    googleMapsApiKey: token,
    scriptOptions: {
      onload: () => handleScriptLoad(),
    },
  });    


  const handleScriptLoad = () => {
      setShowMap(true);
  };

  const handleInput = (e) => {
    setShowMap(false);
    setValue(e.target.value);
    setAddress(e.target.value);
  };

  const handleSelect = (address) => {
    setValue(address, false);
    setAddress(address);
    setShowMap(true)
    clearSuggestions();

    getGeocode({ address })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng })=>{
        setLatitud(lat),
        setLongitud(lng)
      }
      )
      .catch((error) => {
        console.log('Error retrieving geolocation:', error);
      });
  };



  return (
<div className={styles.container}>
<div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tipo de vehículo:</label>
        <select value={vehiculo} onChange={(e) => setTipoVehiculo(e.target.value)}>
          <option value="Coche">Coche</option>
          <option value="Moto">Moto</option>
        </select>
      </div>

      <div>
        <label>Tamaño:</label>
        <select value={tamano} onChange={(e) => setTamaño(e.target.value)}>
          <option value="Pequeño (3.6 x 1,6m)">Pequeño (3.6 x 1,6m)</option>
          <option value="Mediano (4,5 X 1,8m)">Mediano (4,5 X 1,8m)</option>
          <option value="Grande (5 x 1,9m)">GGrande (5 x 1,9m)</option>
        </select>
      </div>
          <div>
              <input
                value={value}
                onChange={handleInput}
                placeholder="Búsca tu dirección aquí:"
              />
              {status === 'OK' && (
                <ul>
                  {data.map(({ place_id, description }) => (
                    <li key={place_id} onClick={() => handleSelect(description)}>
                      {description}
                    </li>
                  ))}
                </ul>
              )}
              <p>Dirección: {address}</p>
              {showMap && (
                <Map address={address} />
              )}
            </div>
      <button type="submit">Enviar</button>
    </form>
    </div>

  </div>
  );
};

export default Parker;