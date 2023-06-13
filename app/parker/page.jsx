'use client';
const tokenStrapi = process.env.NEXT_PUBLIC_API_STRAPI;
const token = process.env.NEXT_PUBLIC_API_PLACES;

import React, { useState } from "react";
import styles from './../page.module.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import Map from '../components/map';
import Image from 'next/image'



const Parker = () => {
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [vehiculo, setTipoVehiculo] = useState('Coche');
  const [tamano, setTamaño] = useState('Pequeño (3,6 x 1,6m)');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      vehiculo,
      tamano,
      direccion: address,
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
        body: JSON.stringify({ data })
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
      .then(({ lat, lng }) => {
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
      <div className={styles.container_columns}>
        <div className={styles.container_columns_left}>
          <h1>¡Hola Parker!</h1>
          <p>Indícanos los datos de tu plaza y te enviaremos aquellos conductores compatibles e interesados en ella.</p>
          <p>Tú decides con quien contactar. Sin costes ni compromiso. 🙂</p>
        </div>
        <div className={styles.container_columns_right}>
        <h2 className={styles.title_h2}>¿Dónde se ubica tu plaza?</h2>
        <p>Indica el nº para ser más precisos en la búqueda</p>
        <input
        value={value}
        onChange={handleInput}
        placeholder="Calle, número, CP, población"
        className={styles.formulario}
      />
      {status === 'OK' && (
        <ul className={styles.suggestions_list}>
          {data.map(({ place_id, description }) => (
            <div className={styles.suggestions} key={place_id} onClick={() => handleSelect(description)}>
              <Image className={styles.park_image} width={15} height={21} src='/parking-ico.png' />{description}
            </div>
          ))}
        </ul>
      )}
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
                <option value="Pequeño (3,6 x 1,6m)">Pequeño (3,6 x 1,6m)</option>
                <option value="Mediano (4,5 x 1,8m)">Mediano (4,5 x 1,8m)</option>
                <option value="Grande (5 x 1,9m)">Grande (5 x 1,9m)</option>
              </select>
            </div>
            <div>
             
              <br />
              {showMap && (
                <Map address={address} />
              )}
            </div>
            <br />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Parker;